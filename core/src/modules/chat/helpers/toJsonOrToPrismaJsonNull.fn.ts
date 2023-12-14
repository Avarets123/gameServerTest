import { Prisma } from '@prisma/client'

export const toJsonOrToPrismaJsonNull = <T extends { value: unknown }>(
  data: T,
) => {
  const { value } = data
  if (value === null) return Prisma.JsonNull

  return JSON.stringify(value)
}
