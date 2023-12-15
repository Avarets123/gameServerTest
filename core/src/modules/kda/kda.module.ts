import { Module } from '@nestjs/common'
import { SocketsGateway } from './gateways/sockets.gateway'
import { AuthModule } from '../auth/auth.module'
import { KdaController } from './controllers/kda.controller'
import { KdaService } from './services/kda.service'

@Module({
  imports: [AuthModule],
  controllers: [KdaController],
  providers: [
    SocketsGateway,
    KdaService,
  ],
})
export class KdaModule {}
