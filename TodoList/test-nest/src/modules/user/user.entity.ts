import {
  Column,
  CreateDateColumn,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm'
import { Todo } from '../todo/todo.entity'
import { ApiProperty } from '@nestjs/swagger'

@Entity()
export class User {
  @ApiProperty()
  @PrimaryGeneratedColumn()
  id: number

  @ApiProperty()
  @Column()
  email: string

  @ApiProperty()
  @Column()
  password: string

  @ApiProperty()
  @Column({ default: 'user' })
  role: string

  @ApiProperty()
  @CreateDateColumn()
  created_at: Date

  @ApiProperty()
  @OneToMany((type) => Todo, (todo) => todo.user, { onDelete: 'CASCADE' })
  todos: Todo[]
}
