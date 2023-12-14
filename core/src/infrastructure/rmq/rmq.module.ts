import {
  AmqpConnectionManager,
  RabbitMQExchangeConfig,
  RabbitMQModule,
  RabbitRpcParamsFactory,
} from '@golevelup/nestjs-rabbitmq'
import { Global, Module } from '@nestjs/common'
import { RmqService } from './rmq.service'

export const getEnv = (envName: string) => process.env[envName]

const user = getEnv('RMQ_USER') || 'user'
const password = getEnv('RMQ_PASSWORD') || 'password'
const host = getEnv('RMQ_HOST') || 'localhost:4444'
const uri = `amqp://${user}:${password}@${host}`

const prefetchCount = +getEnv('PREFETCH_COUNT') || 10

export const CHAT_EXCHANGE = 'chat_exchange'

const exchanges: RabbitMQExchangeConfig[] = [
  {
    name: CHAT_EXCHANGE,
    type: 'direct',
    options: {
      durable: true,
    },
  },
]

@Global()
@Module({
  imports: [
    RabbitMQModule.forRoot(RabbitMQModule, {
      uri,
      connectionInitOptions: { wait: true },
      connectionManagerOptions: {
        heartbeatIntervalInSeconds: 15,
        reconnectTimeInSeconds: 30,
      },
      exchanges,
      prefetchCount,
    }),
  ],
  providers: [
    RabbitRpcParamsFactory,
    AmqpConnectionManager,
    RmqService,
  ],
  exports: [
    RabbitRpcParamsFactory,
    AmqpConnectionManager,
    RmqService,
  ],
})
export class RMQModule {}
