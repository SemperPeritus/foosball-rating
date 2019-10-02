import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { FindManyOptions, getManager, Repository } from 'typeorm';

import { GameEntity } from './game.entity';
import { GameDto } from './game.dto';
import { PlayerEntity } from '../player/player.entity';

@Injectable()
export class GameService {
  constructor(@InjectRepository(GameEntity) private gameRepository: Repository<GameEntity>) {}

  async showAll(options?: FindManyOptions<GameEntity>) {
    return await this.gameRepository.find(options);
  }

  async read(id: string, options?: FindManyOptions<GameEntity>) {
    const game = await this.gameRepository.findOne(id, options);

    if (!game) {
      throw new HttpException('Not Found', HttpStatus.NOT_FOUND);
    }

    return game;
  }

  async create(data: GameDto) {
    const entityManager = getManager();

    const player1OfTeam1 = await entityManager.findOne(PlayerEntity, data.player1OfTeam1);
    const player2OfTeam1 = await entityManager.findOne(PlayerEntity, data.player2OfTeam1);
    const player1OfTeam2 = await entityManager.findOne(PlayerEntity, data.player1OfTeam2);
    const player2OfTeam2 = await entityManager.findOne(PlayerEntity, data.player2OfTeam2);

    const game = await this.gameRepository.create(data);

    game.players = [player1OfTeam1, player2OfTeam1, player1OfTeam2, player2OfTeam2];

    await this.gameRepository.save(game);

    return game;
  }
}
