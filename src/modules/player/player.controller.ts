import { Body, Controller, Get, Param, Patch, Post, Query, UsePipes } from '@nestjs/common';

import { PlayerService } from './player.service';
import { PlayerDto } from './player.dto';
import { ValidationPipe } from '../../shared/processing/validation.pipe';
import { parseSort } from '../../shared/helpers/parseSort';

@Controller('player')
export class PlayerController {
  constructor(private readonly playerService: PlayerService) {}

  @Get()
  showAllPlayers(@Query('include') include: string, @Query('sort') sort: string) {
    const relations = include && include.split(',');
    const order = parseSort(sort);
    return this.playerService.showAll({ relations, order });
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
