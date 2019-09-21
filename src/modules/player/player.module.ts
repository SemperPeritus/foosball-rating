import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { PlayerController } from './player.controller';
import { PlayerService } from './player.service';
import { PlayerEntity } from './player.entity';
import { GameModule } from '../game/game.module';
import { GameEntity } from '../game/game.entity';

@Module({
  imports: [TypeOrmModule.forFeature([PlayerEntity]), GameModule, TypeOrmModule.forFeature([GameEntity])],
  controllers: [PlayerController],
  providers: [PlayerService],
})
export class PlayerModule {}
