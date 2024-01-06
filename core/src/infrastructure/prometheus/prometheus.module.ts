import { Module } from '@nestjs/common'
import { PrometheusService } from './services/prometheus.service'
import { PrometheusInterceptor } from './interceptors/prometheus.interceptor'

@Module({
  providers: [
    PrometheusService,
    PrometheusInterceptor,
  ],
  exports: [
    PrometheusInterceptor,
    PrometheusService,
  ],
})
export class PrometheusModule {}
