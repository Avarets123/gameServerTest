import {
  ConnectedSocket,
  MessageBody,
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
} from '@nestjs/websockets'
import { Server, Socket } from 'socket.io'
import { RmqService } from 'src/infrastructure/rmq/rmq.service'
import { UseFilters, UseGuards, UsePipes } from '@nestjs/common'
import { AllWSExceptionFilter } from 'src/infrastructure/exceptions/filters/allExceptionsFilters'
import { WsAuthGuard } from '../../auth/guards/wsAuth.guard'
import { WSValidationPipe } from 'src/infrastructure/validation/validation.boot'

@UseFilters(AllWSExceptionFilter)
@WebSocketGateway({ cors: {} })
export class SocketsGateway {
  constructor(private readonly rmqService: RmqService) {}

  @WebSocketServer()
  server: Server

  @UsePipes(WSValidationPipe)
  @UseGuards(WsAuthGuard)
  @SubscribeMessage('')
  async eventMessageCreate(
    // @MessageBody() body: MessageCreateDto,
    @ConnectedSocket() socket: Socket,
  ) {}
}
