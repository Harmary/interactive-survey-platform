import { Controller, Get, Post, Delete, Param, Body } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse, ApiBody } from '@nestjs/swagger';
import { PollService } from './poll.service';
import { Polls } from './poll.entity';
import { CreatePollDto } from './createPoll.dto';
import { Gateway } from 'src/gateway/gateway';

@ApiTags('polls')
@Controller('polls')
export class PollController {
  constructor(
    private readonly pollService: PollService,
    private readonly websocketGateway: Gateway,
  ) {}

  @Post()
  @ApiOperation({ summary: 'Создать новый опрос' })
  @ApiResponse({
    status: 201,
    description: 'Опрос успешно создан.',
    type: Polls,
  })
  @ApiBody({ type: CreatePollDto })
  create(@Body() createPollDto: Partial<Polls>): Promise<Polls> {
    return this.pollService.create(createPollDto);
  }

  @Get()
  @ApiOperation({ summary: 'Получить список всех опросов' })
  @ApiResponse({
    status: 200,
    description: 'Список всех опросов.',
    type: [Polls],
  })
  findAll(): Promise<Polls[]> {
    return this.pollService.findAll();
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Удалить опрос по его ID' })
  @ApiResponse({ status: 200, description: 'Опрос успешно удален.' })
  remove(@Param('id') id: number): Promise<void> {
    return this.pollService.remove(id);
  }

  @Post(':id/vote')
  @ApiOperation({
    summary: 'Проголосовать за один из вариантов в опросе по его ID',
  })
  @ApiResponse({
    status: 200,
    description: 'Голос успешно добавлен.',
    type: Polls,
  })
  @ApiBody({
    schema: {
      type: 'object',
      properties: { answerIndex: { type: 'number', example: 1 } },
    },
  })
  vote(
    @Param('id') id: number,
    @Body('answerIndex') answerIndex: number,
  ): Promise<Polls> {
    return this.pollService.vote(id, answerIndex);
  }
}
