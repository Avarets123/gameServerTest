import {
  register,
  Histogram,
  HistogramConfiguration,
  Gauge,
  GaugeConfiguration,
  Counter,
  CounterConfiguration,
  Registry,
} from 'prom-client'

export class PrometheusFactory {
  constructor(private readonly appPrefix?: string) {}

  createHistogram(config: HistogramConfiguration<string>) {
    const _config: HistogramConfiguration<string> = {
      name: 'custom_RPS',
      help: 'some help descriptions',
      buckets: [
        0.1,
        5,
        15,
        50,
        100,
        500,
        1000,
      ],
      labelNames: [
        'method',
        'code',
        'path',
      ],
    }
    config = _config

    this.setPrefix(config)

    return new Histogram(config)
  }

  createGauge(config: GaugeConfiguration<string>) {
    this.setPrefix(config)
    return new Gauge(config)
  }

  createCounter(config: CounterConfiguration<string>) {
    this.setPrefix(config)
    return new Counter(config)
  }

  createRegistry() {
    return new Registry()
  }

  private setPrefix<T extends { name: string }>(data: T) {
    if (!this.appPrefix) return

    data.name = `${this.appPrefix}_${data.name}`
  }
}
