import { HttpException, HttpStatus, Injectable, Logger } from '@nestjs/common';
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

  async getPlayersRating() {
    const players = await this.playerRepository.find();
    const relations = ['players'];
    const games = await this.gameRepository.find({ relations });

    return getRatingForPlayers(players, games);
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
}
