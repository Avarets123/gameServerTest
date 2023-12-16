import { Module } from '@nestjs/common'
import { SocketGateway } from './gateways/socket.gateway'
import { AuthModule } from '../auth/auth.module'
import { KdaController } from './controllers/kda.controller'
import { KdaService } from './services/kda.service'

@Module({
  imports: [AuthModule],
  controllers: [KdaController],
  providers: [
    SocketGateway,
    KdaService,
  ],
})
export class KdaModule {}
