import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';
import { ApiProperty } from '@nestjs/swagger';

@Entity()
export class Polls {
  @PrimaryGeneratedColumn()
  @ApiProperty({ example: 1, description: 'Уникальный идентификатор опроса' })
  id: number;

  @Column({
    nullable: false,
  })
  @ApiProperty({
    example: 'Ваш любимый цвет?',
    description: 'Заголовок опроса',
  })
  title: string;

  @Column('text', { array: true })
  @ApiProperty({
    example: ['Красный', 'Синий', 'Зеленый', 'Желтый'],
    description: 'Варианты ответов',
  })
  answers: string[];

  @Column('integer', { array: true })
  @ApiProperty({
    example: [0, 0, 0, 0],
    description: 'Голоса для каждого варианта',
  })
  votes: number[];

  @Column()
  @ApiProperty({
    example: 'single',
    description: 'Тип опроса (одиночный или множественный выбор)',
  })
  type: 'multiple' | 'single';

  @Column({ default: false })
  @ApiProperty({
    example: false,
    description: 'Флаг, указывающий, был ли опрос завершен',
  })
  submitted: boolean;
}
