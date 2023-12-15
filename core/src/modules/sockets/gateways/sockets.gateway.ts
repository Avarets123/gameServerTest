import {
  ConnectedSocket,
  MessageBody,
  OnGatewayConnection,
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
} from '@nestjs/websockets'
import { Server, Socket } from 'socket.io'
import { UseFilters, UseGuards, UsePipes } from '@nestjs/common'
import { AllWSExceptionFilter } from 'src/infrastructure/exceptions/filters/allExceptionsFilters'
import { WsAuthGuard } from '../../auth/guards/wsAuth.guard'
import { WSValidationPipe } from 'src/infrastructure/validation/validation.boot'
import { AuthService } from 'src/modules/auth/services/auth.service'
import { SocketsEventsEnum } from '../enums/socketsEvents.enum'

@UseFilters(AllWSExceptionFilter)
@WebSocketGateway({ cors: {},  })
export class SocketsGateway implements OnGatewayConnection {
  constructor(private readonly authService: AuthService) {}

  @WebSocketServer()
  server: Server

  @UsePipes(WSValidationPipe)
  @UseGuards(WsAuthGuard)
  @SubscribeMessage('check')
  async eventMessageCreate(
    @MessageBody() body,
    @ConnectedSocket() socket: Socket,
  ) {
    body.clientData = socket.data
    socket.emit('okey', body)
  }

  async handleConnection(client: Socket) {
    try {
      // const token = client.handshake.auth.token
      const token = client.handshake.headers.authorization || ''
      const userId = await this.authService.verifyUserByToken(
        token.split(' ')[1],
      )
      client.data.userId = userId
    } catch (error) {
      console.error(error)
      client.emit(SocketsEventsEnum.EXCEPTION, {
        event: SocketsEventsEnum.EXCEPTION,
        ...error?.error,
      })
      client.disconnect()
    }
  }
}
