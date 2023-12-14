import { BadRequestException } from '@nestjs/common'

export class UserNotExistsException extends BadRequestException {
  constructor() {
    super({
      message: 'Пользователь с таким никнеймом не найден!',
    })
  }
}
