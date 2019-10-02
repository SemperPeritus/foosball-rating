import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { GameController } from './game.controller';
import { GameService } from './game.service';
import { GameEntity } from './game.entity';
import { PlayerEntity } from '../player/player.entity';

@Module({
  imports: [TypeOrmModule.forFeature([GameEntity]), TypeOrmModule.forFeature([PlayerEntity])],
  controllers: [GameController],
  providers: [GameService],
  exports: [GameService],
})
export class GameModule {}
