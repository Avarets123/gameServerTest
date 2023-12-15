import { BadRequestException, Injectable } from '@nestjs/common'
import { ConfigService } from '@nestjs/config'
import { JwtService } from '@nestjs/jwt'
import { TokensType } from '../types/tokens.type'
import { WsException } from '@nestjs/websockets'

@Injectable()
export class TokensService {
  constructor(
    private readonly config: ConfigService,
    private readonly jwtService: JwtService,
  ) {}

  private readonly ACCESS_SECRET = this.config.get('JWT_ACCESS_SECRET')
  private readonly REFRESH_SECRET = this.config.get('JWT_REFRESH_SECRET')

  generateTokens<T extends { id: string }>(user: T): TokensType {
    const { id } = user
    return {
      accessToken: this.jwtService.sign(
        { id },
        { secret: this.ACCESS_SECRET, expiresIn: '5h' },
      ),
      refreshToken: this.jwtService.sign(
        { id },
        { secret: this.REFRESH_SECRET },
      ),
    }
  }

  verifyToken(token: string, ws = false): string {
    try {
      const { id } = this.jwtService.verify(token, {
        secret: this.ACCESS_SECRET,
      })

      return id
    } catch (error) {
      const message = 'Invalid access token'

      if (ws) {
        throw new WsException({
          message,
        })
      }

      throw new BadRequestException({
        message,
      })
    }
  }
}
