import {
  Body,
  Controller,
  HttpException,
  HttpStatus,
  Post,
} from '@nestjs/common'

import { AuthService } from './auth.service'
import { UserRegistrationDto } from './dto/user-registration.dto'
import { UserService } from '../user/user.service'
import { UserLoginDto } from './dto/user-login.dto'
import { ApiBody, ApiResponse, ApiTags } from '@nestjs/swagger'

@ApiTags('auth')
@Controller('auth')
export class AuthController {
  public constructor(
    private readonly userService: UserService,

    private readonly authService: AuthService,
  ) {}

  @Post('/registration')
  @ApiBody({ type: UserRegistrationDto })
  @ApiResponse({
    status: 201,
    description: 'Created new user and res user token',
    type: String,
  })
  public async registration(@Body() body: UserRegistrationDto) {
    const user = await this.userService.findOneByEmail(body.email)
    if (user) {
      throw new HttpException('User is exist', HttpStatus.CONFLICT)
    }
    const token = await this.authService.registration(body)
    return token
  }

  @Post('/login')
  @ApiBody({ type: UserLoginDto })
  @ApiResponse({
    status: 201,
    description: 'Login user and res user token',
    type: String,
  })
  public async login(@Body() body: UserLoginDto) {
    const user = await this.userService.findOneByEmail(body.email)
    if (!user) {
      throw new HttpException('User not exist', HttpStatus.CONFLICT)
    }

    return this.authService.login(body)
  }
}
