import { Module } from '@nestjs/common'
import { DatabaseModule } from './infrastructure/database/database.module'
import { AuthModule } from './modules/auth/auth.module'
import { RedisModule } from './infrastructure/redis/redis.module'
import { ConfigModule } from '@nestjs/config'
import { KdaModule } from './modules/kda/kda.module'
import { LoggerModule } from './infrastructure/logger/logger.module'
import { PrometheusModule } from './infrastructure/prometheus/prometheus.module'
import { AppController } from './app.controller'

export const getEnv = (env: string) => process.env[env]

@Module({
  imports: [
    PrometheusModule,
    DatabaseModule,
    KdaModule,
    ConfigModule.forRoot({ isGlobal: true }),
    LoggerModule,
    RedisModule,
    AuthModule,
  ],
  controllers: [AppController],
})
export class AppModule {}
