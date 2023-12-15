import { Injectable, OnModuleDestroy } from '@nestjs/common'
import { RedisRepository } from '../repository/redis.repository'

@Injectable()
//TODO
export class RedisService extends RedisRepository implements OnModuleDestroy {
  onModuleDestroy() {
    this.redis.disconnect()
  }
}
