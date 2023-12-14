import { CacheModule } from '@nestjs/cache-manager'
import * as redisStore from 'cache-manager-redis-store'
import { Global, Module } from '@nestjs/common'

const port = +process.env.REDIS_PORT
const host = process.env.REDIS_HOST

@Global()
@Module({
  imports: [
    CacheModule.register({
      host,
      isGlobal: true,
      store: redisStore.create({ host, port }),
    }),
  ],

})
export class RedisModule {}
