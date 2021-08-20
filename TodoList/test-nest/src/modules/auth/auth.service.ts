import { Injectable, UnauthorizedException } from '@nestjs/common'
import * as bcrypt from 'bcrypt'
import { JwtService } from '@nestjs/jwt'
import { User } from '../user/user.entity'
import { UserRegistrationDto } from './dto/user-registration.dto'
import { UserService } from '../user/user.service'
import { UserLoginDto } from './dto/user-login.dto'

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UserService,
    private readonly jwtService: JwtService,
  ) {}
  public passwordHash(password): Promise<string> {
    return bcrypt.hash(password, 12)
  }
  public async registration(userDto: UserRegistrationDto) {
    const hashedPassword = await this.passwordHash(userDto.password)
    const user = await this.userService.create({
      ...userDto,
      password: hashedPassword,
    })

    return this.generateToken(user)
  }
  private async generateToken(user: User) {
    const payload = { email: user.email, id: user.id }
    return {
      token: this.jwtService.sign(payload),
    }
  }

  public async checkToken(token: string) {
    if (!token) {
      throw new Error('Error')
    }

    return this.jwtService.verify(token)
  }

  public async login(userDto: UserLoginDto) {
    const user = await this.userService.findOneByEmail(userDto.email)
    const isEqual = await bcrypt.compare(userDto.password, user.password)
    if (isEqual && user) {
      return this.generateToken(user)
    }
    throw new UnauthorizedException({
      message: 'incorrect data',
    })
  }
}
