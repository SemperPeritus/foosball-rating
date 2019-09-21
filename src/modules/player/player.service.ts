import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

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

  async showAll() {
    return await this.playerRepository.find();
  }

  async getPlayersRating() {
    const players = await this.playerRepository.find();
    const relations = ['player1OfTeam1', 'player2OfTeam1', 'player1OfTeam2', 'player2OfTeam2'];
    const games = await this.gameRepository.find({ relations });
    return getRatingForPlayers(players, games);
  }

  async read(id: string) {
    const player = await this.playerRepository.findOne(id);

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
