import { Controller, Get, UseGuards } from '@nestjs/common'
import JwtAccessGuard from 'src/modules/auth/guards/jwtAccess.guard'

@Controller('users')
export class UsersController {
  constructor() {}

  @UseGuards(JwtAccessGuard)
  @Get()
  getUsers() {}
}
