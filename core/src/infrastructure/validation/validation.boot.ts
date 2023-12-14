import { HttpStatus, ValidationError, ValidationPipe } from '@nestjs/common'
import { NestValidationErrorToValidationErrorMapper } from './mappers/nesValidationErrorToValidationError.mapper'

export const WSValidationPipe = new ValidationPipe({
  errorHttpStatusCode: HttpStatus.UNPROCESSABLE_ENTITY,
  exceptionFactory: (errors: ValidationError[] = []) => {
    return new NestValidationErrorToValidationErrorMapper(errors).map()
  },
  whitelist: true,
  transform: true,
})
