import {
  CanActivate,
  ExecutionContext,
  HttpStatus,
  Injectable,
} from '@nestjs/common'
import { Socket } from 'socket.io'
import { AuthService } from '../services/auth.service'
import { WsException } from '@nestjs/websockets'
import { UnAuthorizedException } from 'src/modules/chat/exception/unauthorized.exception'

@Injectable()
export class WsAuthGuard implements CanActivate {
  constructor(private readonly authService: AuthService) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const socket = context.switchToWs().getClient<Socket>()

    try {
      const token = socket.handshake.auth?.token

      if (!token) throw new UnAuthorizedException('Токен не передан!')

      // const [
      //   _,
      //   token,
      // ] = socket.handshake.headers.authorization.split(' ')

      // const memberId = await this.authService.getAuthMember(token)

      // socket.data.memberId = memberId

      // if (!!memberId) {
      //   // const roomsIds = await this.authService.getMemberRoomsIds(memberId)
      //   socket.join(roomsIds)
      // }

      return false
    } catch (e) {
      console.warn(e)

      throw new WsException({
        ...e?.response,
      })
    }
  }
}
