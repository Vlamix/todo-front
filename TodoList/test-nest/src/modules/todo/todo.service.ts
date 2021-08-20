import { Injectable } from '@nestjs/common'
import { Repository } from 'typeorm'
import { Todo } from './todo.entity'
import { InjectRepository } from '@nestjs/typeorm'
import { ITodo } from './todo.types'

@Injectable()
export class TodoService {
  constructor(
    @InjectRepository(Todo)
    private todoRepository: Repository<Todo>,
  ) {}

  public async create(todo: ITodo) {
    return await this.todoRepository.save(todo)
  }

  public async findAll(userId: any): Promise<ITodo[]> {
    return await this.todoRepository.find({ user: userId })
  }

  public async findOneById(id: number) {
    return await this.todoRepository.findOne(id)
  }

  public async delete(id: number) {
    await this.todoRepository.delete(id).then((result) => {
      return result
    })
  }

  public async updateTodo(id: number, body: any) {
    await this.todoRepository.update(id, body).then((result) => {
      return result
    })
  }

  public async completeTodo(id: number, body: any) {
    await this.todoRepository.update(id, body).then((result) => {
      return result
    })
  }
}
