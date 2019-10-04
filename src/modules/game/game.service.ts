import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { FindManyOptions, In, Repository } from 'typeorm';

import { GameEntity } from './game.entity';
import { GameDto } from './game.dto';
import { PlayerEntity } from '../player/player.entity';

@Injectable()
export class GameService {
  constructor(
    @InjectRepository(GameEntity) private gameRepository: Repository<GameEntity>,
    @InjectRepository(PlayerEntity) private playerRepository: Repository<PlayerEntity>,
  ) {}

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
    const game = await this.gameRepository.create(data);

    const firstTeam = await this.playerRepository.find({ id: In(data.firstTeam) });
    const secondTeam = await this.playerRepository.find({ id: In(data.secondTeam) });

    game.players = [...firstTeam, ...secondTeam];
    game.firstTeam = firstTeam;
    game.secondTeam = secondTeam;

    await this.gameRepository.save(game);

    return game;
  }
}
