import { IsEmail, Length } from 'class-validator'
import { ApiProperty } from '@nestjs/swagger'

export class UserRegistrationDto {
  @ApiProperty()
  @IsEmail(
    {},
    {
      message: 'Некоректно введен email',
    },
  )
  readonly email: string

  @ApiProperty()
  @Length(6, 20, {
    message: 'Длина пароля должна быть от 6 до 20 символов',
  })
  readonly password: string

  @ApiProperty()
  readonly role?: string
}
