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
import { WsValidationPipe } from 'src/infrastructure/validation/validation.boot'
import { AuthService } from 'src/modules/auth/services/auth.service'
import { SocketsEventsEnum } from '../enums/socketsEvents.enum'
import { IncrementKdaDto } from '../dto/incrementKda.dto'
import { KdaService } from '../services/kda.service'
import { setTokenGetter } from '../utils'
import { ConfigService } from '@nestjs/config'

@UseFilters(AllWSExceptionFilter)
@WebSocketGateway({ cors: {} })
export class SocketGateway implements OnGatewayConnection {
  constructor(
    private readonly authService: AuthService,
    private readonly kdaService: KdaService,
    private readonly config: ConfigService,
  ) {}

  private readonly getToken = setTokenGetter(this.config.get('AUTH_TYPE'))

  @WebSocketServer()
  server: Server

  @UsePipes(WsValidationPipe)
  @UseGuards(WsAuthGuard)
  @SubscribeMessage(SocketsEventsEnum.KDA_GET)
  async eventKdaGet(
    @MessageBody() body: Omit<IncrementKdaDto, 'incrementField'>,
    @ConnectedSocket() socket: Socket,
  ) {
    const res = await this.kdaService.findUserKda(body)

    socket.emit(SocketsEventsEnum.KDA_GET, res)
  }

  @UsePipes(WsValidationPipe)
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
      const token = this.getToken(client)
      const userId = await this.authService.verifyUserByToken(token)
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
