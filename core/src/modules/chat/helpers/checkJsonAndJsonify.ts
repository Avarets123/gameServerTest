import { Prisma } from '@prisma/client'

export const checkJsonAndJsonify = (value: unknown) => {
  if (value === null) return Prisma.JsonNull
  if (!value) return undefined

  if (typeof value === 'string') return value
  return JSON.stringify(value)
}
