import { Module } from '@nestjs/common'
import { TodoController } from './todo.controller'
import { TypeOrmModule } from '@nestjs/typeorm'
import { Todo } from './todo.entity'
import { TodoSharedModule } from './todo-shared.module'
import { UserSharedModule } from '../user/user-shared.module'
import { AuthSharedModule } from '../auth/auth-shared.module'

@Module({
  imports: [
    TodoSharedModule,
    UserSharedModule,
    AuthSharedModule,
    TypeOrmModule.forFeature([Todo]),
  ],
  controllers: [TodoController],
})
export class TodoModule {}
