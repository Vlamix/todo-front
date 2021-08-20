import { Controller, Delete, Get, Param } from '@nestjs/common'
import { UserService } from './user.service'
import { IUser } from './user.types'
import { ApiParam, ApiResponse, ApiTags } from '@nestjs/swagger'
import { User } from './user.entity'

@ApiTags('user')
@Controller('user')
export class UserController {
  constructor(private userService: UserService) {}

  @Get()
  @ApiResponse({ status: 200, description: 'Res all users', type: [User] })
  public getAll() {
    return this.userService.findAll()
  }

  @Get(':id')
  @ApiParam({ type: Number, name: 'id', description: 'User id' })
  @ApiResponse({ status: 200, description: 'Res one user by id', type: User })
  public async getOne(@Param() { id }): Promise<IUser> {
    return await this.userService.findOneById(id)
  }

  @Get()
  @ApiParam({ name: 'email', description: 'Users email' })
  @ApiResponse({
    status: 200,
    description: 'Res one user by email',
    type: User,
  })
  public async getOneById(@Param() { email }): Promise<IUser> {
    return await this.userService.findOneByEmail(email)
  }

  @Delete(':id')
  @ApiParam({ type: Number, name: 'id', description: 'User id' })
  @ApiResponse({
    status: 200,
    description: 'Delete one user by id and res - nothing',
  })
  public remove(@Param() { id }): Promise<void> {
    return this.userService.remove(id)
  }
}
