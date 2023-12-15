import { Controller, Get, UseGuards } from '@nestjs/common'
import JwtAccessGuard from 'src/modules/auth/guards/jwtAccess.guard'
import { UsersService } from '../services/users.service'

@Controller('users')
export class UsersController {
  constructor(private readonly userService: UsersService) {}

  @UseGuards(JwtAccessGuard)
  @Get()
  findMany() {
    return this.userService.findMany()
  }
}
