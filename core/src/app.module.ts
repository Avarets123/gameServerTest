import { Module } from '@nestjs/common'
import { DatabaseModule } from './infrastructure/database/database.module'
import { AuthModule } from './modules/auth/auth.module'
import { RedisModule } from './infrastructure/redis/redis.module'
import { ConfigModule } from '@nestjs/config'
import { KdaModule } from './modules/kda/kda.module'
import { LoggerModule } from './infrastructure/logger/logger.module'

export const getEnv = (env: string) => process.env[env]

@Module({
  imports: [
    DatabaseModule,
    KdaModule,
    ConfigModule.forRoot({ isGlobal: true }),
    LoggerModule,
    RedisModule,
    AuthModule,
  ],
})
export class AppModule {}
