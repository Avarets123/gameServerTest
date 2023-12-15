import { Inject, Injectable } from '@nestjs/common'
import { Redis } from 'ioredis'

@Injectable()
export class RedisRepository {
  constructor(@Inject('RedisProvider') private readonly redis: Redis) {}

  async hGetAll(key: string) {
    return this.redis.hgetall(key)
  }

  async hGet(key: string, field: string) {
    return this.redis.hget(key, field)
  }
  async hmGet(key: string, fields: string[]) {
    return this.redis.hmget(key, ...fields)
  }
  async hSet(key: string, data: any) {
    await this.redis.hset(key, data)
  }
  async hIncrBy(key: string, incrField: string, incrCount: number) {
    await this.redis.hincrby(key, incrField, incrCount)
  }
}
