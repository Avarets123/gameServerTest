import { BadRequestException, HttpStatus } from '@nestjs/common'

export class InvalidTokenException extends BadRequestException {
  constructor(msg: 'refresh' | 'access') {
    super({
      message: `Invalid ${msg} token`,
      status: HttpStatus.BAD_REQUEST,
    })
  }
}
