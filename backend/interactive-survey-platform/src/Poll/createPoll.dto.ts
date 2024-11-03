import { ApiProperty } from '@nestjs/swagger';

export class CreatePollDto {
  @ApiProperty({
    example: 'Ваш любимый цвет?',
    description: 'Заголовок опроса',
  })
  title: string;

  @ApiProperty({
    example: ['Красный', 'Синий', 'Зеленый', 'Желтый'],
    description: 'Варианты ответов',
  })
  answers: string[];

  @ApiProperty({
    example: [0, 0, 0, 0],
    description: 'Голоса для каждого варианта',
  })
  votes: number[];

  @ApiProperty({
    example: 'single',
    description: 'Тип опроса (одиночный или множественный выбор)',
  })
  type: 'multiple' | 'single';

  @ApiProperty({
    example: false,
    description: 'Флаг, указывающий, был ли опрос завершен',
  })
  submitted: boolean;
}
