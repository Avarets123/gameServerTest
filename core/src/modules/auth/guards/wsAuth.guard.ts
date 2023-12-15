import {
  CanActivate,
  ExecutionContext,
  HttpStatus,
  Injectable,
} from '@nestjs/common'
import { Socket } from 'socket.io'
import { AuthService } from '../services/auth.service'
import { WsException } from '@nestjs/websockets'
import { UnAuthorizedException } from '../exceptions/unauthorized.exception'
import { WsUnAuthorizedException } from '../exceptions/wsUnAuthorized.exception'

@Injectable()
export class WsAuthGuard implements CanActivate {
  constructor(private readonly authService: AuthService) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const socket = context.switchToWs().getClient<Socket>()

    try {

      const userId = socket.data.userId


      if (!userId) throw new WsUnAuthorizedException('')

      return true
    } catch (e) {
      console.warn(e)

      throw new WsException({
        ...e?.response,
      })
    }
  }
}
