import { HttpException, HttpStatus } from '@nestjs/common'
import { ValidationErrorResponse } from './validationError.response'
import { WsException } from '@nestjs/websockets'

export class ValidationErrorWs extends WsException {
  constructor(
    response: ValidationErrorResponse,
    status: number = HttpStatus.UNPROCESSABLE_ENTITY,
  ) {
    super(response)
  }
}

export class ValidationError extends HttpException {
  constructor(
    response: ValidationErrorResponse,
    status: number = HttpStatus.UNPROCESSABLE_ENTITY,
  ) {
    super(response, status)
  }
}
