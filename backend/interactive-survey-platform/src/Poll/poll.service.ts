import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Polls } from './poll.entity';

@Injectable()
export class PollService {
  constructor(
    @InjectRepository(Polls)
    private pollRepository: Repository<Polls>,
  ) {}

  create(poll: Partial<Polls>): Promise<Polls> {
    const newPoll = this.pollRepository.create(poll);
    return this.pollRepository.save(newPoll);
  }

  findAll(): Promise<Polls[]> {
    return this.pollRepository.find();
  }

  findOne(id: number): Promise<Polls> {
    return this.pollRepository.findOneBy({ id });
  }

  async remove(id: number): Promise<void> {
    await this.pollRepository.delete(id);
  }

  async vote(id: number, answerIndex: number): Promise<Polls> {
    const poll = await this.findOne(id);
    if (!poll) {
      throw new Error('Poll not found');
    }
    poll.votes[answerIndex] += 1;
    return this.pollRepository.save(poll);
  }
}
