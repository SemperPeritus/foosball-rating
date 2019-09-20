import { IsNumber } from 'class-validator';

import { PlayerEntity } from '../player/player.entity';
import { Team } from './game.entity';

export class GameDto {
  @IsNumber()
  player1OfTeam1: PlayerEntity;

  @IsNumber()
  player2OfTeam1: PlayerEntity;

  @IsNumber()
  player1OfTeam2: PlayerEntity;

  @IsNumber()
  player2OfTeam2: PlayerEntity;

  @IsNumber()
  winner: Team;
}
