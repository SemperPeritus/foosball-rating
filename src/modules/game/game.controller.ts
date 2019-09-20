import { Body, Controller, Get, Param, Post, Query, UsePipes } from '@nestjs/common';

import { GameService } from './game.service';
import { GameDto } from './game.dto';
import { ValidationPipe } from '../../shared/processing/validation.pipe';

@Controller('game')
export class GameController {
  constructor(private readonly gameService: GameService) {}

  @Get()
  showAllGames(@Query('include') include: string) {
    const relations = include && include.split(',');
    return this.gameService.showAll({ relations });
  }

  @Get(':id')
  readGame(@Param('id') id: string, @Query('include') include: string) {
    const relations = include && include.split(',');
    return this.gameService.read(id, { relations });
  }

  @Post()
  @UsePipes(new ValidationPipe())
  createGame(@Body() data: GameDto) {
    return this.gameService.create(data);
  }
}
