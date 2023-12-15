import { BadRequestException, Injectable } from '@nestjs/common'
import { UsersService } from 'src/modules/users/services/users.service'
import { UserCreateDto } from 'src/modules/users/dto/userCreate.dto'
import { UserExistsException } from 'src/modules/users/exceptions/userExists.exception'
import { HashService } from './hash.service'
import { UserNotExistsException } from 'src/modules/users/exceptions/userNotExists.exception'
import { TokensService } from './tokens.service'
import { InvalidPasswordException } from '../exceptions/invalidPassword.exception'
import { TokensType } from '../types/tokens.type'
import { InvalidTokenException } from '../exceptions/invalidToken.exception'
import { WsUnAuthorizedException } from '../exceptions/wsUnAuthorized.exception'
import { UnAuthorizedException } from '../exceptions/unauthorized.exception'

@Injectable()
export class AuthService {
  constructor(
    private readonly usersService: UsersService,
    private readonly hashService: HashService,
    private readonly tokensService: TokensService,
  ) {}

  async signUp(dto: UserCreateDto) {
    const { nickname, password } = dto

    const hasUser = await this.usersService.findUserByNickname(nickname)

    if (hasUser) throw new UserExistsException()

    dto.password = await this.hashService.hashPassword(password)

    const newUser = await this.usersService.create(dto)

    return this.tokensService.generateTokens(newUser)
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

    return this.tokensService.generateTokens(hasUser)
  }

  async refreshToken(userId: string): Promise<TokensType> {
    const hasUser = await this.usersService.findUserById(userId)

    if (!hasUser) throw new UnAuthorizedException('Invalid refresh token')

    return this.tokensService.generateTokens({ id: userId })
  }

  async verifyUserByToken(token: string) {
    if (!token) throw new WsUnAuthorizedException('Токен не передан!')

    const userId = this.tokensService.verifyToken(token)

    const hasUser = await this.usersService.findUserById(userId)

    if (!hasUser) {
      throw new WsUnAuthorizedException('Передан не валидный токен!')
    }

    return userId
  }
}
