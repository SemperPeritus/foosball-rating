import { Body, Controller, Delete, Get, Param, Post, Query, UsePipes } from '@nestjs/common';

import { GameService } from './game.service';
import { GameDto } from './game.dto';
import { ValidationPipe } from '../../processing/validation.pipe';
import { GameValidationPipe } from './gameValidation.pipe';
import { RequireMinimalRole } from '../../processing/roles.decorator';
import { Role, UserEntity } from '../user/user.entity';
import { User } from '../../processing/user.decorator';
import { parseSort } from '../../helpers/parseSort';

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

  @Delete(':id')
  @RequireMinimalRole(Role.USER)
  deleteGame(@Param('id') id: string, @User() user: UserEntity) {
    return this.gameService.delete(id, user);
  }
}
