import { Body, Controller, Get, Param, Post, Query, UsePipes } from '@nestjs/common';

import { GameService } from './game.service';
import { GameDto } from './game.dto';
import { ValidationPipe } from '../../shared/processing/validation.pipe';
import { GameValidationPipe } from './game.validation';
import { RequireMinimalRole } from '../../shared/processing/roles.decorator';
import { Role } from '../user/user.entity';

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
  @RequireMinimalRole(Role.user)
  @UsePipes(ValidationPipe)
  @UsePipes(GameValidationPipe)
  createGame(@Body() data: GameDto) {
    return this.gameService.create(data);
  }
}
