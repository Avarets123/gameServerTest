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
import { IncrementKdaDto } from '../dto/incrementKda.dto'
import { KdaService } from '../services/kda.service'



@UseFilters(AllWSExceptionFilter)
@WebSocketGateway({ cors: {} })
export class SocketGateway implements OnGatewayConnection {
  constructor(
    private readonly authService: AuthService,
    private readonly kdaService: KdaService,
  ) {}

  @WebSocketServer()
  server: Server

  @UsePipes(WSValidationPipe)
  @UseGuards(WsAuthGuard)
  @SubscribeMessage(SocketsEventsEnum.KDA_GET)
  async eventKdaGet(
    @MessageBody() body: Omit<IncrementKdaDto, 'incrementField'>,
    @ConnectedSocket() socket: Socket,
  ) {
    const res = await this.kdaService.findUserKda(body)

    socket.emit(SocketsEventsEnum.KDA_GET, res)
  }

  @UsePipes(WSValidationPipe)
  @UseGuards(WsAuthGuard)
  @SubscribeMessage(SocketsEventsEnum.KDA_INCREMENT)
  async eventKdaIncrement(
    @MessageBody() body: IncrementKdaDto,
    @ConnectedSocket() socket: Socket,
  ) {
    await this.kdaService.incrementKda(body)

    const res = await this.kdaService.findUserKda(body)

    socket.emit(SocketsEventsEnum.KDA_GET, res)
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
