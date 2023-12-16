import { Socket } from 'socket.io'

type TokenGetterFn = (socket: Socket) => string

export const setTokenGetter = (env: string): TokenGetterFn => {
  if (env === 'HEADER') {
    return (socket: Socket) =>
      (socket.handshake.headers.authorization || '').split(' ')[1]
  }

  return (socket: Socket) => socket.handshake.auth.token
}
