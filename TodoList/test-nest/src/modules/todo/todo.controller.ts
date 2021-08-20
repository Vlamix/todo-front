import {
  Body,
  Controller,
  Get,
  Post,
  Put,
  Headers,
  Param,
  Delete,
  Patch,
} from '@nestjs/common'
import { TodoService } from './todo.service'
import { AuthService } from '../auth/auth.service'
import { TodoDto, UpdateTodoDto } from './dto/todo.dto'
import {
  ApiBody,
  ApiHeader,
  ApiParam,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger'
import { Todo } from './todo.entity'

@ApiTags('todo')
@Controller('todo')
export class TodoController {
  constructor(
    private todoService: TodoService,
    private authService: AuthService,
  ) {}

  @Get()
  @ApiHeader({ name: 'token', description: 'User token' })
  @ApiResponse({
    status: 200,
    description: 'Res all todos of one user',
    type: [Todo],
  })
  public async getAll(@Headers() { token }) {
    const user = await this.authService.checkToken(token)
    if (!user) {
      return {
        error: 'user not found',
      }
    }

    return await this.todoService.findAll(user.id)
  }

  @Get(':id')
  @ApiParam({ type: Number, name: 'Id', description: 'Todos id' })
  @ApiResponse({ status: 200, description: 'Res one todos by id', type: Todo })
  public getOne(@Param() { id }) {
    return this.todoService.findOneById(id)
  }

  @Post()
  @ApiBody({ type: TodoDto })
  @ApiHeader({ name: 'token', description: 'User token' })
  @ApiResponse({
    status: 201,
    description: 'Create new todo and res created todo',
    type: Todo,
  })
  public async create(@Body() body: TodoDto, @Headers() headers) {
    const user = await this.authService.checkToken(headers.token)
    if (!user) {
      return {
        error: 'User not found',
      }
    }

    return await this.todoService.create({
      title: body.title,
      user: user,
    })
  }

  @Delete(':id')
  @ApiParam({ type: Number, name: 'Id', description: 'Todos id' })
  @ApiResponse({ status: 200, description: 'Delete todo by id res - nothing' })
  public delete(@Param() { id }) {
    return this.todoService.delete(id)
  }

  @Put(':id')
  @ApiParam({ type: Number, name: 'Id', description: 'Todos id' })
  @ApiBody({ type: UpdateTodoDto })
  @ApiResponse({
    status: 200,
    description: 'Update some todo param and res - nothing',
  })
  public updateTodo(@Body() body: UpdateTodoDto, @Param() { id }) {
    return this.todoService.updateTodo(id, body)
  }

  @Patch(':id')
  @ApiParam({ type: Number, name: 'Id', description: 'Todos id' })
  @ApiBody({ type: UpdateTodoDto })
  @ApiResponse({
    status: 200,
    description: 'Update some todo param and res - nothing',
  })
  public completeTodo(@Body() body: UpdateTodoDto, @Param() { id }) {
    return this.todoService.updateTodo(id, body)
  }
}
