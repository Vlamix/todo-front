import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm'
import { User } from '../user/user.entity'
import { ApiProperty } from '@nestjs/swagger'

@Entity()
export class Todo {
  @ApiProperty()
  @PrimaryGeneratedColumn()
  id: number

  @ApiProperty()
  @Column()
  title: string

  @ApiProperty({ default: false })
  @Column({ default: false })
  isChecked: boolean

  @ApiProperty({ default: '' })
  @Column({ default: '' })
  description: string

  @ApiProperty()
  @CreateDateColumn()
  createdDate: Date

  @ApiProperty()
  @ManyToOne((type) => User, (user) => user.todos, { onDelete: 'CASCADE' })
  user: User
}
