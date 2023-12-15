import { Module } from '@nestjs/common'
import { LoggerModule as Logger } from 'nestjs-pino'

@Module({
  imports: [
    Logger.forRoot({
      pinoHttp: {
        customProps: () => ({
          context: 'HTTP',
        }),
        transport: {
          target: 'pino-pretty',
          options: { singleLine: true, colorize: true },
        },
      },
    }),
  ],
  providers: [],
})
export class LoggerModule {}
