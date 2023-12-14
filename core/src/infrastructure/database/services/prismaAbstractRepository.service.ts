import { Prisma, PrismaClient } from '@prisma/client'
import { PrismaService } from './prisma.service'

export abstract class PrismaRepositoryAbstract<
  K extends Exclude<keyof PrismaClient, symbol | `$${string}`>,
> {
  constructor(
    protected readonly prisma: PrismaService,
    private readonly model: K,
  ) {}

  async aggregate(
    args: Parameters<PrismaClient[K]['aggregate']>[0],
    transaction?: Prisma.TransactionClient,
  ) {
    const prisma = transaction || this.prisma

    return (prisma[this.model].aggregate as any)(args)
  }

  async count(
    args: Parameters<PrismaClient[K]['count']>[0],
    transaction?: Prisma.TransactionClient,
  ) {
    const prisma = transaction || this.prisma

    return (prisma[this.model].count as any)(args)
  }

  async create(
    args: Parameters<PrismaClient[K]['create']>[0],
    transaction?: Prisma.TransactionClient,
  ) {
    const prisma = transaction || this.prisma

    return (prisma[this.model].create as any)(args)
  }

  async createMany(
    args: Parameters<PrismaClient[K]['createMany']>[0],
    transaction?: Prisma.TransactionClient,
  ) {
    const prisma = transaction || this.prisma

    return (prisma[this.model].createMany as any)(args)
  }

  async delete(
    args: Parameters<PrismaClient[K]['delete']>[0],
    transaction?: Prisma.TransactionClient,
  ) {
    const prisma = transaction || this.prisma

    return (prisma[this.model].delete as any)(args)
  }

  async deleteMany(
    args: Parameters<PrismaClient[K]['deleteMany']>[0],
    transaction?: Prisma.TransactionClient,
  ) {
    const prisma = transaction || this.prisma

    return (prisma[this.model].deleteMany as any)({ ...args })
  }

  async findFirst(
    args: Parameters<PrismaClient[K]['findFirst']>[0],
    transaction?: Prisma.TransactionClient,
  ) {
    const prisma = transaction || this.prisma

    return (prisma[this.model].findFirst as any)(args)
  }

  async findFirstOrThrow(
    args: Parameters<PrismaClient[K]['findFirstOrThrow']>[0],
    transaction?: Prisma.TransactionClient,
  ) {
    const prisma = transaction || this.prisma

    return (prisma[this.model].findFirstOrThrow as any)(args)
  }

  async findMany(
    args: Parameters<PrismaClient[K]['findMany']>[0],
    transaction?: Prisma.TransactionClient,
  ) {
    const prisma = transaction || this.prisma

    return (prisma[this.model].findMany as any)(args)
  }

  async findUnique(
    args: Parameters<PrismaClient[K]['findUnique']>[0],
    transaction?: Prisma.TransactionClient,
  ) {
    const prisma = transaction || this.prisma

    return (prisma[this.model].findUnique as any)(args)
  }

  async findUniqueOrThrow(
    args: Parameters<PrismaClient[K]['findUniqueOrThrow']>[0],
    transaction?: Prisma.TransactionClient,
  ) {
    const prisma = transaction || this.prisma

    return (prisma[this.model].findUniqueOrThrow as any)(args)
  }

  async update(
    args: Parameters<PrismaClient[K]['update']>[0],
    transaction?: Prisma.TransactionClient,
    ...other: unknown[]
  ) {
    const prisma = transaction || this.prisma

    return (prisma[this.model].update as any)(args)
  }

  async updateMany(
    args: Parameters<PrismaClient[K]['updateMany']>[0],
    transaction?: Prisma.TransactionClient,
  ) {
    const prisma = transaction || this.prisma

    return (prisma[this.model].updateMany as any)(args)
  }

  async upsert(
    args: Parameters<PrismaClient[K]['upsert']>[0],
    transaction?: Prisma.TransactionClient,
  ) {
    const prisma = transaction || this.prisma

    return (prisma[this.model].upsert as any)(args)
  }
}
