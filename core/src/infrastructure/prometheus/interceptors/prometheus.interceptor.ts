import {
  Injectable,
  NestInterceptor,
  ExecutionContext,
  CallHandler,
} from '@nestjs/common'
import { Observable, lastValueFrom } from 'rxjs'
import { PrometheusService } from '../services/prometheus.service'
import { Request } from 'express'

@Injectable()
export class PrometheusInterceptor implements NestInterceptor {
  constructor(private readonly prometheusService: PrometheusService) {}

  async intercept(context: ExecutionContext, next: CallHandler) {
    const rpsHistogram = this.prometheusService.rpsHistogram
    const reqCounter = this.prometheusService.requestsCounter

    const end = rpsHistogram.startTimer()
    const req = context.switchToHttp().getRequest<Request>()

    const method = req.method
    const code = context.switchToHttp().getResponse().statusCode
    const path = req.path

    const obsData = next.handle()

    const res = await lastValueFrom(obsData)

    rpsHistogram
      .labels({
        method,
        code,
        path,
      })
      .observe(end())

    reqCounter.labels({ method, code, path }).inc()

    return res
  }
}
