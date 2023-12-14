import { ArgumentsHost, Catch } from '@nestjs/common'
import { BaseWsExceptionFilter, WsException } from '@nestjs/websockets'
import { Socket } from 'socket.io'
import { SocketEventsEnum } from 'src/modules/chat/enums/socketEvents.enum'

@Catch(WsException)
export class AllWSExceptionFilter extends BaseWsExceptionFilter {
  catch(exception: WsException, host: ArgumentsHost) {
    console.log(exception)

    const client = host.switchToWs().getClient() as Socket
    const error = exception.getError()
    const details = error instanceof Object ? { ...error } : { message: error }
    client.emit(SocketEventsEnum.CHAT_SERVICE_EXCEPTION, {
      event: SocketEventsEnum.CHAT_SERVICE_EXCEPTION,
      ...details,
    })
    client.disconnect()
  }
}
