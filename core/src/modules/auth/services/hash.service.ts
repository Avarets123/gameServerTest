import { Injectable } from '@nestjs/common'
import { compare, hash } from 'bcrypt'

@Injectable()
export class HashService {
  constructor() {}

  hashPassword(password: string, difficult = 9) {
    return hash(password, difficult)
  }

  comparePasswords(originalPassword: string, hashedPassword: string) {
    return compare(originalPassword, hashedPassword)
  }
}
