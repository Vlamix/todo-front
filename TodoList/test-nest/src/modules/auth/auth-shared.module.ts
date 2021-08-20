import { Module } from '@nestjs/common'
import { AuthService } from './auth.service'
import { JwtModule } from '@nestjs/jwt'
import { UserSharedModule } from '../user/user-shared.module'

@Module({
  imports: [
    JwtModule.register({
      secret: 'secret',
      signOptions: { expiresIn: '2h' },
    }),
    UserSharedModule,
  ],
  providers: [AuthService],
  exports: [AuthService],
})
export class AuthSharedModule {}
