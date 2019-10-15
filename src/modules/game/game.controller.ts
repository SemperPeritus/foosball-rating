import { Body, Controller, Get, Param, Post, Query, UsePipes } from '@nestjs/common';

import { GameService } from './game.service';
import { GameDto } from './game.dto';
import { ValidationPipe } from '../../shared/processing/validation.pipe';
import { GameValidationPipe } from './gameValidation.pipe';
import { RequireMinimalRole } from '../../shared/processing/roles.decorator';
import { Role, UserEntity } from '../user/user.entity';
import { User } from '../../shared/processing/user.decorator';
import { parseSort } from '../../shared/helpers/parseSort';

@Controller('game')
export class GameController {
  constructor(private readonly gameService: GameService) {}

  @Get()
  showAllGames(@Query('include') include: string, @Query('sort') sort: string) {
    const relations = include && include.split(',');
    const order = parseSort(sort);

    return this.gameService.showAll({ relations, order });
  }

  @Get(':id')
  readGame(@Param('id') id: string, @Query('include') include: string) {
    const relations = include && include.split(',');

    return this.gameService.read(id, { relations });
  }

  @Post()
  @RequireMinimalRole(Role.USER)
  @UsePipes(ValidationPipe)
  @UsePipes(GameValidationPipe)
  createGame(@Body() data: GameDto, @User() user: UserEntity) {
    return this.gameService.create(data, user);
  }
}
