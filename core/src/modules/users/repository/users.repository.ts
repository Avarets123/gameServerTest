import { Inject, Injectable } from '@nestjs/common'
import { PrismaService } from 'src/infrastructure/database/services/prisma.service'
import { PrismaRepositoryAbstract } from 'src/infrastructure/database/services/prismaAbstractRepository.service'

@Injectable()
export class UsersRepository extends PrismaRepositoryAbstract<'users'> {
  constructor(@Inject(PrismaService) prisma: PrismaService) {
    super(prisma, 'users')
  }
}
