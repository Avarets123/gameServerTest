import { Inject, Injectable, OnModuleInit } from '@nestjs/common'
import { Redis } from 'ioredis'

@Injectable()
export class RedisRepository {
  constructor(@Inject('RedisProvider') protected readonly redis: Redis) {}

  async hGetAll<T = any>(key: string): Promise<T> {
    return this.redis.hgetall(key) as T
  }

  async hGet(key: string, field: string) {
    return this.redis.hget(key, field)
  }
  async hmGet(key: string, fields: string[]) {
    return this.redis.hmget(key, ...fields)
  }
  async hSet(key: string, ...fieldsAndValues: any[]) {
    await this.redis.hset(key, ...fieldsAndValues)
  }
  async hIncrBy(key: string, incrField: string, incrCount: number) {
    await this.redis.hincrby(key, incrField, incrCount)
  }

  async hDel(key: string, fields: string[]) {
    return this.redis.hdel(key, ...fields)
  }
}
