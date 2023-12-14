import { IsString } from 'class-validator'

export class UserCreateDto {
  @IsString()
  nickname: string

  @IsString()
  password: string
}
