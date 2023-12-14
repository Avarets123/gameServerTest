import { Module } from '@nestjs/common'
import { UsersService } from './services/users.service'
import { UsersRepository } from './repository/users.repository'
import { UsersController } from './controllers/users.controller'

@Module({
  providers: [
    UsersService,
    UsersRepository,
  ],
  controllers: [UsersController],
  exports: [UsersService],
})
export class UsersModule {}
