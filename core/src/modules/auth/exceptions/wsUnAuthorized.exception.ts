import { WsException } from '@nestjs/websockets'

export class WsUnAuthorizedException extends WsException {
  constructor(message: string) {
    super({
      message,
      code: 'UNAUTHORIZED',
    })
  }
}
