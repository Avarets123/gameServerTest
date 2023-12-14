import { Module } from '@nestjs/common'
import { DatabaseModule } from './infrastructure/database/database.module'
import { getEnv } from './infrastructure/rmq/rmq.module'
import { AuthModule } from './modules/auth/auth.module'
import { MapperModule } from './infrastructure/automapper/mapper.module'
import { RedisModule } from './infrastructure/redis/redis.module'
import { ConfigModule } from '@nestjs/config'
import { JwtModule } from './infrastructure/jwt/jw.module'

@Module({
  imports: [
    DatabaseModule,
    // ChatModule,
    ConfigModule.forRoot({ isGlobal: true }),

    RedisModule,
    AuthModule,
    MapperModule,
  ],
})
export class AppModule {}
