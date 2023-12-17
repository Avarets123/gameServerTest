import {
  CanActivate,
  ExecutionContext,
  HttpStatus,
  Injectable,
} from '@nestjs/common'
import { Socket } from 'socket.io'
import { WsException } from '@nestjs/websockets'

@Injectable()
export class WsAuthGuard implements CanActivate {
  async canActivate(context: ExecutionContext): Promise<boolean> {
    const socket = context.switchToWs().getClient<Socket>()

    try {
      const userId = socket.data.userId

      if (!userId) return false

      return true
    } catch (e) {
      console.warn(e)

      throw new WsException({
        ...e?.response,
      })
    }
  }
}
