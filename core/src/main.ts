import { NestFactory } from '@nestjs/core'
import { AppModule, getEnv } from './app.module'
import { exceptionBoot } from './infrastructure/exceptions/bootExceptions'

async function bootstrap() {
  const app = await NestFactory.create(AppModule)

  const PORT = getEnv('SERVER_PORT') || 3002
  exceptionBoot(app)
  app.enableCors()

  await app.listen(PORT)

  console.log(`Server has ben started on ${PORT}`)
}
bootstrap()
