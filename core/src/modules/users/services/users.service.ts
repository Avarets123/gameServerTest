import { Injectable } from '@nestjs/common'
import { UsersRepository } from '../repository/users.repository'
import { UserCreateDto } from '../dto/userCreate.dto'
import { UserModel } from 'src/infrastructure/database/models/user.model'

@Injectable()
export class UsersService {
  constructor(private readonly userRepo: UsersRepository) {}

  async findMany() {
    return this.userRepo.findMany({
      select: {
        id: true,
        nickname: true,
        createdAt: true,
      },
    })
  }

  async create(data: UserCreateDto) {
    return this.userRepo.create({
      data,
    })
  }

  async findUserByNickname(nickname: string): Promise<UserModel> {
    return this.userRepo.findFirst({
      where: {
        nickname,
      },
    })
  }

  async findUserById(id: string) {
    return this.userRepo.findFirst({
      where: {
        id,
      },
    })
  }
}
