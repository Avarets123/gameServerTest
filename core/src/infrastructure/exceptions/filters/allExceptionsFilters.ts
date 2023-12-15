import { ArgumentsHost, Catch } from '@nestjs/common'
import { BaseWsExceptionFilter, WsException } from '@nestjs/websockets'
import { Socket } from 'socket.io'
import { SocketsEventsEnum } from 'src/modules/sockets/enums/socketsEvents.enum'

@Catch(WsException)
export class AllWSExceptionFilter extends BaseWsExceptionFilter {
  catch(exception: WsException, host: ArgumentsHost) {
    console.log(exception)

    const client = host.switchToWs().getClient() as Socket
    const error = exception.getError()
    const details = error instanceof Object ? { ...error } : { message: error }
    client.emit(SocketsEventsEnum.EXCEPTION, {
      event: SocketsEventsEnum.EXCEPTION,
      ...details,
    })
    client.disconnect()
  }
}
