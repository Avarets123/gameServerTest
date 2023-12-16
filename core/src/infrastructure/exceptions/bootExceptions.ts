import { INestApplication } from '@nestjs/common'
import { PrismaExceptionsFilter } from './filters/prismaExceptionFilters'
import { AllWSExceptionFilter } from './filters/allExceptionsFilters'
import { WsValidationPipe } from '../validation/validation.boot'

export function exceptionBoot(app: INestApplication) {
  app.useGlobalFilters(new AllWSExceptionFilter())
  app.useGlobalFilters(new PrismaExceptionsFilter())
}
