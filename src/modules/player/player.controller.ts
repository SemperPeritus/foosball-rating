import { Body, Controller, Get, Param, Post, UsePipes } from '@nestjs/common';

import { PlayerService } from './player.service';
import { PlayerDto } from './player.dto';
import { ValidationPipe } from '../../shared/processing/validation.pipe';

@Controller('player')
export class PlayerController {
  constructor(private readonly playerService: PlayerService) {}

  @Get()
  showAllPlayers() {
    return this.playerService.showAll();
  }

  @Get(':id')
  readPlayer(@Param('id') id: string) {
    return this.playerService.read(id);
  }

  @Post()
  @UsePipes(new ValidationPipe())
  createPlayer(@Body() data: PlayerDto) {
    return this.playerService.create(data);
  }
}
