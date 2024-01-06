import { NestFactory } from '@nestjs/core'
import { AppModule, getEnv } from './app.module'
import { exceptionBoot } from './infrastructure/exceptions/bootExceptions'
import { Logger, LoggerErrorInterceptor } from 'nestjs-pino'
import { HttpValidationPipe } from './infrastructure/validation/validation.boot'
import { PrometheusService } from './infrastructure/prometheus/services/prometheus.service'
import { PrometheusInterceptor } from './infrastructure/prometheus/interceptors/prometheus.interceptor'

async function bootstrap() {
  const app = await NestFactory.create(AppModule, { bufferLogs: true })

  const PORT = getEnv('SERVER_PORT') || 3002
  exceptionBoot(app)
  app.enableCors()
  app.useLogger(app.get(Logger))
  app.flushLogs()

  const prometheusService = app.get(PrometheusService)

  app.useGlobalInterceptors(
    new PrometheusInterceptor(prometheusService),
    new LoggerErrorInterceptor(),
  )
  app.useGlobalPipes(HttpValidationPipe)

  await app.listen(PORT)

  console.log(`Server has ben started on port ${PORT}`)
}
bootstrap()
