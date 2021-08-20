import { Module } from '@nestjs/common'
import { AppController } from './app.controller'
import { AppService } from './app.service'
import { TodoModule } from '../modules/todo/todo.module'
import { TypeOrmModule } from '@nestjs/typeorm'
import { Connection } from 'typeorm'
import { UserModule } from '../modules/user/user.module'
import { User } from '../modules/user/user.entity'
import { Todo } from '../modules/todo/todo.entity'
import { AuthModule } from '../modules/auth/auth.module'

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: 'localhost',
      port: 3306,
      username: 'root',
      password: 'qQ12345!',
      database: 'Test',
      entities: [User, Todo],
      synchronize: true,
      autoLoadEntities: true,
    }),
    UserModule,
    AuthModule,
    TodoModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {
  constructor(private connection: Connection) {}
}
