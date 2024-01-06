import { Controller, Get, OnModuleInit, Res } from '@nestjs/common'
import { PrometheusService } from './infrastructure/prometheus/services/prometheus.service'

@Controller()
export class AppController {
  constructor(private readonly prometheusService: PrometheusService) {}

  @Get('metrics')
  async getMetrics() {
    return this.prometheusService.register.metrics()
  }
}
