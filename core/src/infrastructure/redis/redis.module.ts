import { Global, Module } from '@nestjs/common'
import { Redis } from 'ioredis'
import { RedisRepository } from './repository/redis.repository'
import { RedisService } from './services/redis.service'

const port = +process.env.REDIS_PORT || 6379
const host = process.env.REDIS_HOST

@Global()
@Module({
  imports: [],
  providers: [
    {
      provide: 'RedisProvider',
      useFactory: () => {
        const redis = new Redis({ port, host })

        redis.on('error', () =>
          console.error(`Error in connecting to redis by ${host}:${port}`),
        )
        return redis
      },
    },
    RedisRepository,
    RedisService,
  ],
  exports: [RedisService],
})
export class RedisModule {}
