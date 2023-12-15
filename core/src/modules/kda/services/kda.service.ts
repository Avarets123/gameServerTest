import { Injectable } from '@nestjs/common'
import { RedisService } from 'src/infrastructure/redis/services/redis.service'
import { IncrementKdaDto } from '../dto/incrementKda.dto'
import { getUserKey } from '../utils'
import { KdaType, UserKdaResponseType } from '../types/kda.type'

@Injectable()
export class KdaService {
  constructor(private readonly redisService: RedisService) {}

  async incrementKda(data: IncrementKdaDto) {
    const { incrementField, tournament, nickname } = data

    const key = getUserKey(tournament, nickname)

    await this.redisService.hIncrBy(key, incrementField, 1)
  }

  async findUserKda(
    data: Omit<IncrementKdaDto, 'incrementField'>,
  ): Promise<UserKdaResponseType> {
    const { nickname, tournament } = data

    const userKda = await this.redisService.hGetAll<KdaType>(
      getUserKey(tournament, nickname),
    )

    return {
      nickname,
      tournament,
      ...this.mapKdaData(userKda),
    }
  }

  private mapKdaData(data: KdaType): KdaType {
    return {
      K: data?.K || 0,
      D: data?.D || 0,
      A: data?.A || 0,
    }
  }
}
