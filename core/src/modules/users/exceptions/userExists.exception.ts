import { BadRequestException } from '@nestjs/common'

export class UserExistsException extends BadRequestException {
  constructor() {
    super({
      message: 'Пользователь с таким никнеймом уже зарегистрирован!',
    })
  }
}
