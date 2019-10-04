import { Body, Controller, Get, Param, Patch, Post, Query, UsePipes } from '@nestjs/common';

import { PlayerService } from './player.service';
import { PlayerDto } from './player.dto';
import { ValidationPipe } from '../../shared/processing/validation.pipe';

@Controller('player')
export class PlayerController {
  constructor(private readonly playerService: PlayerService) {}

  @Get()
  showAllPlayers(@Query('include') include: string) {
    const relations = include && include.split(',');
    return this.playerService.showAll({ relations });
  }

  @Get(':id')
  readPlayer(@Param('id') id: string, @Query('include') include: string) {
    const relations = include && include.split(',');
    return this.playerService.read(id, { relations });
  }

  @Post()
  @UsePipes(new ValidationPipe())
  createPlayer(@Body() data: PlayerDto) {
    return this.playerService.create(data);
  }

  @Patch('rating')
  showAllPlayersRating() {
    return this.playerService.getPlayersRating();
  }
}
