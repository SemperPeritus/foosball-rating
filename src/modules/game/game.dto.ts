import { IsEnum, IsNumber } from 'class-validator';

import { Team } from './game.entity';

export class GameDto {
  @IsNumber(null, { each: true })
  firstTeam: number[];

  @IsNumber(null, { each: true })
  secondTeam: number[];

  @IsEnum(Team)
  winner: Team;
}
