import { AmqpConnection } from '@golevelup/nestjs-rabbitmq'
import { Injectable } from '@nestjs/common'

@Injectable()
export class RmqService {
  constructor(private readonly amqp: AmqpConnection) {}

  async publishMessage<T>(exchange: string, routingKey: string, message: T) {
    return await this.amqp.publish(exchange, routingKey, message)
  }

  request<DT, RT>(exchange: string, routingKey: string, payload?: DT) {
    return this.amqp.request<RT>({ exchange, routingKey, payload })
  }
}
