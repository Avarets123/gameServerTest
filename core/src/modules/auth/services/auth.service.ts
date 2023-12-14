import { BadRequestException, Injectable } from '@nestjs/common'
import { UsersService } from 'src/modules/users/services/users.service'
import { UserCreateDto } from 'src/modules/users/dto/userCreate.dto'
import { UserExistsException } from 'src/modules/users/exceptions/userExists.exception'
import { HashService } from './hash.service'
import { UserNotExistsException } from 'src/modules/users/exceptions/userNotExists.exception'
import { TokenGenerateService } from './tokenGenerate.service'
import { InvalidPasswordException } from '../exceptions/invalidPassword.exception'
import { TokensType } from '../types/tokens.type'

@Injectable()
export class AuthService {
  constructor(
    private readonly usersService: UsersService,
    private readonly hashService: HashService,
    private readonly tokenGenerateService: TokenGenerateService,
  ) {}

  async signUp(dto: UserCreateDto) {
    const { nickname, password } = dto

    const hasUser = await this.usersService.findUserByNickname(nickname)

    if (hasUser) throw new UserExistsException()

    dto.password = await this.hashService.hashPassword(password)

    const newUser = await this.usersService.create(dto)

    return this.tokenGenerateService.generateTokens(newUser)
  }

  async signIn(dto: UserCreateDto) {
    const { nickname, password } = dto

    const hasUser = await this.usersService.findUserByNickname(nickname)

    if (!hasUser) throw new UserNotExistsException()

    const isValidPassword = await this.hashService.comparePasswords(
      password,
      hasUser.password,
    )

    if (!isValidPassword) throw new InvalidPasswordException()

    return this.tokenGenerateService.generateTokens(hasUser)
  }

  async refreshToken(userId: string): Promise<TokensType> {
    const hasUser = await this.usersService.findUserById(userId)

    if (!hasUser) {
      throw new BadRequestException({
        message: 'Invalid refresh token',
      })
    }

    return this.tokenGenerateService.generateTokens({ id: userId })
  }
}
