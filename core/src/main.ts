import { NestFactory } from '@nestjs/core'
import { AppModule, getEnv } from './app.module'
import { exceptionBoot } from './infrastructure/exceptions/bootExceptions'
import { Logger, LoggerErrorInterceptor } from 'nestjs-pino'
import { HttpValidationPipe } from './infrastructure/validation/validation.boot'

async function bootstrap() {
  const app = await NestFactory.create(AppModule, { bufferLogs: true })

  const PORT = getEnv('SERVER_PORT') || 3002
  exceptionBoot(app)
  app.enableCors()
  app.useLogger(app.get(Logger))
  app.flushLogs()
  app.useGlobalInterceptors(new LoggerErrorInterceptor())
  app.useGlobalPipes(HttpValidationPipe)

  await app.listen(PORT)

  console.log(`Server has ben started on port ${PORT}`)
}
bootstrap()
