import { Module } from '@nestjs/common'
import { SocketsGateway } from './gateways/sockets.gateway'

@Module({
  controllers: [],
  providers: [SocketsGateway],
})
export class SocketsModule {}
