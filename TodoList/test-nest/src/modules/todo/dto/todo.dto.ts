import { IsNotEmpty } from 'class-validator'
import { ApiProperty } from '@nestjs/swagger'

export class TodoDto {
  @ApiProperty()
  @IsNotEmpty()
  readonly title: string
}

export class UpdateTodoDto {
  @ApiProperty({ required: false })
  title?: string
  @ApiProperty({ required: false })
  isChecked?: boolean
}
