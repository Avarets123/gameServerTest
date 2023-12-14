import { HttpStatus } from '@nestjs/common'
import { ValidationErrorResponse } from './validationError.response'
import { WsException } from '@nestjs/websockets'

export class ValidationError extends WsException {
  constructor(
    response: ValidationErrorResponse,
    status: number = HttpStatus.UNPROCESSABLE_ENTITY,
  ) {
    super(response)
  }
}
