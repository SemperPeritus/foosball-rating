import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { FindManyOptions, FindOneOptions, Repository } from 'typeorm';

import { PlayerEntity } from './player.entity';
import { GameEntity } from '../game/game.entity';
import { PlayerDto } from './player.dto';
import { Entities } from '../../shared/constants/entities';
import { getRatingForPlayers } from '../../shared/helpers/rating.helper';

@Injectable()
export class PlayerService {
  constructor(
    @InjectRepository(PlayerEntity) private playerRepository: Repository<PlayerEntity>,
    @InjectRepository(GameEntity) private gameRepository: Repository<GameEntity>,
  ) {}

  async showAll(options?: FindManyOptions<PlayerEntity>) {
    return await this.playerRepository.find(options);
  }

  async read(id: string, options?: FindOneOptions<PlayerEntity>) {
    const player = await this.playerRepository.findOne(id, options);

    if (!player) {
      throw new HttpException('Not Found', HttpStatus.NOT_FOUND);
    }

    return player;
  }

  async create(data: PlayerDto) {
    const player = await this.playerRepository.create(data);

    player.rating = Entities.PLAYER_DEFAULT_RATING;

    await this.playerRepository.save(player);

    return player;
  }

  async getPlayersRating() {
    const players = (await this.playerRepository.find()).map(player => {
      player.rating = 1400;
      return player;
    });
    const relations = ['players', 'firstTeam', 'secondTeam'];
    const games = await this.gameRepository.find({ relations, order: { created: 'ASC' } });

    const playersWithRating = getRatingForPlayers(players, games);

    await Promise.all(
      players.map(async player => {
        const newPlayer = playersWithRating.find(playerWithRating => player.id === playerWithRating.id);
        if (!newPlayer) {
          return { deleted: true };
        }
        return newPlayer && (await this.playerRepository.update(player.id, { rating: newPlayer.rating }));
      }),
    );

    return await this.playerRepository.find({ order: { id: 'ASC' } });
  }
}
