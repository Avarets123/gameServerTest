import { Global, Module } from '@nestjs/common'
import { AuthService } from './services/auth.service'
import { WsAuthGuard } from './guards/wsAuth.guard'
import { JwtAccessTokenStrategy } from './strategies/jwtAccessToken.strategy'
import { JwtRefreshTokenStrategy } from './strategies/jwtRefreshToken.strategy'
import { JwtModule } from 'src/infrastructure/jwt/jw.module'
import { TokenGenerateService } from './services/tokenGenerate.service'
import { UsersModule } from '../users/users.module'
import { AuthController } from './controllers/auth.controller'
import { HashService } from './services/hash.service'

@Module({
  imports: [
    JwtModule,
    UsersModule,
  ],
  providers: [
    AuthService,
    TokenGenerateService,
    HashService,
    WsAuthGuard,
    JwtAccessTokenStrategy,
    JwtRefreshTokenStrategy,
  ],
  exports: [
    AuthService,
    WsAuthGuard,
  ],
  controllers: [AuthController],
})
export class AuthModule {}
