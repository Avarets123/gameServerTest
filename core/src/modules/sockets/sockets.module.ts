import { Module } from '@nestjs/common'
import { SocketsGateway } from './gateways/sockets.gateway'
import { AuthModule } from '../auth/auth.module'

@Module({
  imports: [AuthModule],
  controllers: [],
  providers: [SocketsGateway],
})
export class SocketsModule {}
