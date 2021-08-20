import { Module } from '@nestjs/common'
import { AuthController } from './auth.controller'
import { UserSharedModule } from '../user/user-shared.module'
import { TodoSharedModule } from '../todo/todo-shared.module'
import { AuthSharedModule } from './auth-shared.module'

@Module({
  imports: [AuthSharedModule, UserSharedModule, TodoSharedModule],
  controllers: [AuthController],
})
export class AuthModule {}
