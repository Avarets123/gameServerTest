import { IncrementKdaDto } from '../dto/incrementKda.dto'

type KdaItemType = string | number | null

export type KdaType = Record<'K' | 'D' | 'A', KdaItemType>

export type UserKdaResponseType = Omit<IncrementKdaDto, 'incrementField'> &
  KdaType
