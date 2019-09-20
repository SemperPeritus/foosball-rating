import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { FindManyOptions, Repository } from 'typeorm';

import { GameEntity } from './game.entity';
import { GameDto } from './game.dto';

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
    const game = await this.gameRepository.create(data);

    await this.gameRepository.save(game);

    return game;
  }
}
