import { Module } from '@nestjs/common'
import { DatabaseModule } from './infrastructure/database/database.module'
import { AuthModule } from './modules/auth/auth.module'
import { MapperModule } from './infrastructure/automapper/mapper.module'
import { RedisModule } from './infrastructure/redis/redis.module'
import { ConfigModule } from '@nestjs/config'
import { SocketsModule } from './modules/sockets/sockets.module'

export const getEnv = (env: string) => process.env[env]

@Module({
  imports: [
    DatabaseModule,
    SocketsModule,
    ConfigModule.forRoot({ isGlobal: true }),

    RedisModule,
    AuthModule,
    MapperModule,
  ],
})
export class AppModule {}
