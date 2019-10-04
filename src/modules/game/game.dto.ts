import { IsEnum, IsNumber } from 'class-validator';

import { PlayerEntity } from '../player/player.entity';
import { Team } from './game.entity';

export class GameDto {
  @IsNumber(null, { each: true })
  firstTeam: PlayerEntity[];

  @IsNumber(null, { each: true })
  secondTeam: PlayerEntity[];

  @IsEnum(Team)
  winner: Team;
}
