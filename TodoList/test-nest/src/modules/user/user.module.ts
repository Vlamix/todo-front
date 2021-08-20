import { Module } from '@nestjs/common'
import { UserController } from './user.controller'
import { TypeOrmModule } from '@nestjs/typeorm'
import { User } from './user.entity'
import { TodoSharedModule } from '../todo/todo-shared.module'
import { UserSharedModule } from './user-shared.module'
import { AuthSharedModule } from '../auth/auth-shared.module'

@Module({
  imports: [
    TypeOrmModule.forFeature([User]),
    TodoSharedModule,
    UserSharedModule,
    AuthSharedModule,
  ],
  controllers: [UserController],
})
export class UserModule {}
