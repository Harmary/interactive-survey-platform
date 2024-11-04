import { Test, TestingModule } from '@nestjs/testing';
import { PollService } from './poll.service';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Polls } from './poll.entity';
import { Gateway } from '../gateway/gateway';
import { Repository } from 'typeorm';
import { CreatePollDto } from './createPoll.dto';

describe('PollService', () => {
  let service: PollService;
  let repository: Repository<Polls>;
  let gateway: Gateway;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        PollService,
        {
          provide: getRepositoryToken(Polls),
          useClass: Repository,
        },
        {
          provide: Gateway,
          useValue: {
            emitPollCreated: jest.fn(),
            emitPollDeleted: jest.fn(),
            emitPollVoted: jest.fn(),
          },
        },
      ],
    }).compile();

    service = module.get<PollService>(PollService);
    repository = module.get<Repository<Polls>>(getRepositoryToken(Polls));
    gateway = module.get<Gateway>(Gateway);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('create', () => {
    it('should create a new poll and emit an event', async () => {
      const poll: CreatePollDto = {
        title: 'Test Poll',
        answers: ['Yes', 'No'],
        votes: [0, 0],
        type: 'single',
        submitted: false,
      };
      const savedPoll = { ...poll, id: 1 };

      jest.spyOn(repository, 'create').mockReturnValue(savedPoll as any);
      jest.spyOn(repository, 'save').mockResolvedValue(savedPoll as any);
      jest.spyOn(gateway, 'emitPollCreated');

      const result = await service.create(poll);

      expect(result).toEqual(savedPoll);
      expect(repository.create).toHaveBeenCalledWith(poll);
      expect(repository.save).toHaveBeenCalledWith(savedPoll);
      expect(gateway.emitPollCreated).toHaveBeenCalledWith(savedPoll);
    });
  });

  describe('findAll', () => {
    it('should return all polls', async () => {
      const polls = [
        {
          id: 1,
          title: 'Test Poll',
          answers: ['Yes', 'No'],
          votes: [0, 0],
          type: 'single',
        },
      ];

      jest.spyOn(repository, 'find').mockResolvedValue(polls as any);

      const result = await service.findAll();

      expect(result).toEqual(polls);
      expect(repository.find).toHaveBeenCalled();
    });
  });

  describe('findOne', () => {
    it('should return one poll', async () => {
      const poll = {
        id: 1,
        title: 'Test Poll',
        answers: ['Yes', 'No'],
        votes: [0, 0],
        type: 'single',
      };

      jest.spyOn(repository, 'findOneBy').mockResolvedValue(poll as any);

      const result = await service.findOne(1);

      expect(result).toEqual(poll);
      expect(repository.findOneBy).toHaveBeenCalledWith({ id: 1 });
    });

    it('should return null if poll not found', async () => {
      jest.spyOn(repository, 'findOneBy').mockResolvedValue(null);

      const result = await service.findOne(1);

      expect(result).toBeNull();
      expect(repository.findOneBy).toHaveBeenCalledWith({ id: 1 });
    });
  });

  describe('remove', () => {
    it('should remove a poll and emit an event', async () => {
      jest.spyOn(repository, 'delete').mockResolvedValue({} as any);
      jest.spyOn(gateway, 'emitPollDeleted');

      await service.remove(1);

      expect(repository.delete).toHaveBeenCalledWith(1);
      expect(gateway.emitPollDeleted).toHaveBeenCalledWith(1);
    });
  });

  describe('vote', () => {
    it('should update votes and emit an event', async () => {
      const poll = {
        id: 1,
        title: 'Test Poll',
        answers: ['Yes', 'No'],
        votes: [0, 0],
        type: 'single',
      };
      const updatedPoll = { ...poll, votes: [1, 0] };

      jest.spyOn(service, 'findOne').mockResolvedValue(poll as any);
      jest.spyOn(repository, 'save').mockResolvedValue(updatedPoll as any);
      jest.spyOn(gateway, 'emitPollVoted');

      const result = await service.vote(1, 0);

      expect(result).toEqual(updatedPoll);
      expect(service.findOne).toHaveBeenCalledWith(1);
      expect(repository.save).toHaveBeenCalledWith(updatedPoll);
      expect(gateway.emitPollVoted).toHaveBeenCalledWith(updatedPoll);
    });

    it('should throw an error if poll not found', async () => {
      jest.spyOn(service, 'findOne').mockResolvedValue(null);

      await expect(service.vote(1, 0)).rejects.toThrow('Poll not found');
      expect(service.findOne).toHaveBeenCalledWith(1);
    });
  });
});
