import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { PlayerController } from './player.controller';
import { PlayerService } from './player.service';
import { PlayerEntity } from './player.entity';
import { GameEntity } from '../game/game.entity';

@Module({
  imports: [TypeOrmModule.forFeature([PlayerEntity]), TypeOrmModule.forFeature([GameEntity])],
  controllers: [PlayerController],
  providers: [PlayerService],
  exports: [PlayerService],
})
export class PlayerModule {}
