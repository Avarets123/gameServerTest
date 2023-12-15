import { IsEnum, IsString } from 'class-validator'
import { IncrementEnum } from '../enums/incrementKda.enum'

export class IncrementKdaDto {
  @IsString()
  nickname: string

  @IsString()
  tournament: string

  @IsEnum(IncrementEnum)
  incrementField: IncrementEnum
}
