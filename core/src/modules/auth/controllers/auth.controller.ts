import {
  Body,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Post,
  UseGuards,
} from '@nestjs/common'
import { UserCreateDto } from 'src/modules/users/dto/userCreate.dto'
import { AuthService } from '../services/auth.service'
import JwtRefreshGuard from '../guards/jwtRefresh.guard'
import { AuthUser } from '../decorators/authUser.decorator'

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @HttpCode(HttpStatus.CREATED)
  @Post('sign-up')
  signUp(@Body() body: UserCreateDto) {
    return this.authService.signUp(body)
  }

  @HttpCode(HttpStatus.OK)
  @Post('sign-in')
  signIn(@Body() body: UserCreateDto) {
    return this.authService.signIn(body)
  }

  @UseGuards(JwtRefreshGuard)
  @HttpCode(HttpStatus.OK)
  @Post('refresh-tokens')
  refreshTokens(@AuthUser('id') userId: string) {
    return this.authService.refreshToken(userId)
  }
}
