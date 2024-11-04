import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Polls } from './poll.entity';
import { Gateway } from '../gateway/gateway';

@Injectable()
export class PollService {
  constructor(
    @InjectRepository(Polls)
    private pollRepository: Repository<Polls>,
    private websocketGateway: Gateway,
  ) {}

  async create(poll: Partial<Polls>): Promise<Polls> {
    const newPoll = this.pollRepository.create(poll);
    const savedPoll = await this.pollRepository.save(newPoll);
    this.websocketGateway.emitPollCreated(savedPoll);
    return savedPoll;
  }

  async findAll(): Promise<Polls[]> {
    return this.pollRepository.find();
  }

  async findOne(id: number): Promise<Polls> {
    return this.pollRepository.findOneBy({ id });
  }

  async remove(id: number): Promise<void> {
    await this.pollRepository.delete(id);
    this.websocketGateway.emitPollDeleted(id);
  }

  async vote(id: number, answerIndex: number): Promise<Polls> {
    const poll = await this.findOne(id);
    if (!poll) {
      throw new Error('Poll not found');
    }
    poll.votes[answerIndex] += 1;
    const updatedPoll = await this.pollRepository.save(poll);
    this.websocketGateway.emitPollVoted(updatedPoll);
    return updatedPoll;
  }
}
