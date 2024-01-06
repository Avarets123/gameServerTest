import { Injectable, OnModuleInit } from '@nestjs/common'
import { PrometheusFactory } from './prometheus.factory'
import { Counter, Histogram, Registry } from 'prom-client'

@Injectable()
export class PrometheusService implements OnModuleInit {
  private readonly prometheusMetrics = new PrometheusFactory('game_server_api')
  private _register: Registry = this.prometheusMetrics.createRegistry()

  onModuleInit() {
    this._rpsHistogram = this.prometheusMetrics.createHistogram(null)
    this._requestsCounter = this.prometheusMetrics.createCounter({
      name: 'requests_to_path_counter',
      help: 'requests to path',
      labelNames: [
        'code',
        'method',
        'path',
      ],
    })

    this._register.registerMetric(this._requestsCounter)
    this._register.registerMetric(this._rpsHistogram)
  }

  private _rpsHistogram: Histogram
  private _requestsCounter: Counter

  get rpsHistogram() {
    return this._rpsHistogram
  }

  get register() {
    return this._register
  }

  get requestsCounter() {
    return this._requestsCounter
  }
}
