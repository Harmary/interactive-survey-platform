import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Polls } from './poll.entity';
import { PollService } from './poll.service';
import { PollController } from './poll.controller';
import { GatewayModule } from 'src/gateway/gateway.module';

@Module({
  imports: [TypeOrmModule.forFeature([Polls]), GatewayModule],
  providers: [PollService],
  controllers: [PollController],
})
export class PollModule {}
