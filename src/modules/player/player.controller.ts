import { Body, Controller, Get, Param, Patch, Post, Query, UsePipes } from '@nestjs/common';

import { PlayerService } from './player.service';
import { PlayerDto } from './player.dto';
import { ValidationPipe } from '../../shared/processing/validation.pipe';
import { parseSort } from '../../shared/helpers/parseSort';
import { RequireMinimalRole } from '../../shared/processing/roles.decorator';
import { Role, UserEntity } from '../user/user.entity';
import { User } from '../../shared/processing/user.decorator';

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
  readPlayer(@Param('id') id: string, @Query('include') include: string, @Query('sort') sort: string) {
    const relations = include && include.split(',');
    const order = parseSort(sort);

    return this.playerService.read(id, { relations, order });
  }

  @Post()
  @RequireMinimalRole(Role.USER)
  @UsePipes(ValidationPipe)
  createPlayer(@Body() data: PlayerDto, @User() user: UserEntity) {
    return this.playerService.create(data, user);
  }

  @Patch('rating')
  showAllPlayersRating() {
    return this.playerService.getPlayersRating();
  }
}
