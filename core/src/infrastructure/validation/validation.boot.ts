import {
  HttpStatus,
  ValidationError,
  ValidationPipe,
  ValidationPipeOptions,
} from '@nestjs/common'
import { NestValidationErrorToValidationErrorMapper } from './mappers/nesValidationErrorToValidationError.mapper'

const getBaseValidationPipe = (ws: boolean): ValidationPipeOptions => ({
  errorHttpStatusCode: HttpStatus.UNPROCESSABLE_ENTITY,
  exceptionFactory: (errors: ValidationError[] = []) => {
    return new NestValidationErrorToValidationErrorMapper(errors, ws).map()
  },
  whitelist: true,
  transform: true,
})

export const WsValidationPipe = new ValidationPipe(getBaseValidationPipe(true))

export const HttpValidationPipe = new ValidationPipe(
  getBaseValidationPipe(false),
)
