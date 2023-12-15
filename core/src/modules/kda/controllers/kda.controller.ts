import {
  Body,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  Post,
  UseGuards,
} from '@nestjs/common'
import { IncrementKdaDto } from '../dto/incrementKda.dto'
import JwtAccessGuard from 'src/modules/auth/guards/jwtAccess.guard'
import { KdaService } from '../services/kda.service'

@Controller('kda')
export class KdaController {
  constructor(private readonly kdaService: KdaService) {}

  @HttpCode(HttpStatus.NO_CONTENT)
  @UseGuards(JwtAccessGuard)
  @Post('increment')
  incrementKda(@Body() body: IncrementKdaDto) {
    return this.kdaService.incrementKda(body)
  }

  @HttpCode(HttpStatus.OK)
  @UseGuards(JwtAccessGuard)
  @Get(':tournament/:nickname')
  getUserKda(
    @Param('nickname') nickname: string,
    @Param('tournament') tournament: string,
  ) {
    return this.kdaService.findUserKda({ nickname, tournament })
  }
}
