import { Test, TestingModule } from '@nestjs/testing';
import { PollController } from './poll.controller';
import { PollService } from './poll.service';
import { CreatePollDto } from './createPoll.dto';
import { Polls } from './poll.entity';

describe('PollController', () => {
  let controller: PollController;
  let service: PollService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [PollController],
      providers: [
        {
          provide: PollService,
          useValue: {
            create: jest.fn(),
            findAll: jest.fn(),
            remove: jest.fn(),
            vote: jest.fn(),
          },
        },
      ],
    }).compile();

    controller = module.get<PollController>(PollController);
    service = module.get<PollService>(PollService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('create', () => {
    it('should create a new poll', async () => {
      const pollDto: CreatePollDto = {
        title: 'Test Poll',
        answers: ['Yes', 'No'],
        votes: [0, 0],
        type: 'single',
        submitted: false,
      };
      const createdPoll = { id: 1, ...pollDto };

      jest.spyOn(service, 'create').mockResolvedValue(createdPoll);

      const result = await controller.create(pollDto);

      expect(result).toEqual(createdPoll);
      expect(service.create).toHaveBeenCalledWith(pollDto);
    });
  });

  describe('findAll', () => {
    it('should return all polls', async () => {
      const polls: Polls[] = [
        {
          id: 1,
          title: 'Test Poll',
          answers: ['Yes', 'No'],
          votes: [0, 0],
          type: 'single',
          submitted: false,
        },
      ];

      jest.spyOn(service, 'findAll').mockResolvedValue(polls);

      const result = await controller.findAll();

      expect(result).toEqual(polls);
      expect(service.findAll).toHaveBeenCalled();
    });
  });

  describe('remove', () => {
    it('should remove a poll', async () => {
      const pollId = 1;

      jest.spyOn(service, 'remove').mockResolvedValue(undefined);

      await controller.remove(pollId);

      expect(service.remove).toHaveBeenCalledWith(pollId);
    });
  });

  describe('vote', () => {
    it('should add a vote to the poll', async () => {
      const pollId = 1;
      const answerIndex = 0;
      const updatedPoll: Polls = {
        id: 1,
        title: 'Test Poll',
        answers: ['Yes', 'No'],
        votes: [1, 0],
        type: 'single',
        submitted: false,
      };

      jest.spyOn(service, 'vote').mockResolvedValue(updatedPoll);

      const result = await controller.vote(pollId, answerIndex);

      expect(result).toEqual(updatedPoll);
      expect(service.vote).toHaveBeenCalledWith(pollId, answerIndex);
    });
  });
});
