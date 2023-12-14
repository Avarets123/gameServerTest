import { INestApplication } from '@nestjs/common'
import { PrismaExceptionsFilter } from './filters/prismaExceptionFilters'
import { AllWSExceptionFilter } from './filters/allExceptionsFilters'

export function exceptionBoot(app: INestApplication) {
  app.useGlobalFilters(new AllWSExceptionFilter())
  app.useGlobalFilters(new PrismaExceptionsFilter())
}
