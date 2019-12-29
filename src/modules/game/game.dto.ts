import { IsEnum, IsNumber } from 'class-validator';

import { Team } from './game.entity';

export class GameDto {
  @IsNumber(undefined, { each: true })
  firstTeam: number[];

  @IsNumber(undefined, { each: true })
  secondTeam: number[];

  @IsEnum(Team)
  winner: Team;
}
