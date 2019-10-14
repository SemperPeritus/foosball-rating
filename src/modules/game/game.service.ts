import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { FindManyOptions, In, MoreThan, Repository } from 'typeorm';

import { GameEntity } from './game.entity';
import { GameDto } from './game.dto';
import { PlayerEntity } from '../player/player.entity';
import { UserEntity } from '../user/user.entity';
import { merge } from '../../shared/helpers/merge';
import { Entities } from '../../shared/constants/entities';

@Injectable()
export class GameService {
  constructor(
    @InjectRepository(GameEntity) private gameRepository: Repository<GameEntity>,
    @InjectRepository(PlayerEntity) private playerRepository: Repository<PlayerEntity>,
  ) {}

  async showAll(options?: FindManyOptions<GameEntity>) {
    // Don't remove type for this line. Needs to compile TS.
    const defaultOptions: FindManyOptions<GameEntity> = { order: { created: 'ASC' } };

    return await this.gameRepository.find(merge(defaultOptions, options));
  }

  async read(id: string, options?: FindManyOptions<GameEntity>) {
    const game = await this.gameRepository.findOne(id, options);

    if (!game) {
      throw new HttpException('Not Found', HttpStatus.NOT_FOUND);
    }

    return game;
  }

  async checkIsLimitReached(user: UserEntity) {
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    const games = await this.gameRepository.find({ createdBy: user, created: MoreThan(today) });

    return games.length >= Entities.MAX_GAMES_PER_DAY;
  }

  async create(data: GameDto, user: UserEntity) {
    if (await this.checkIsLimitReached(user)) {
      throw new HttpException('Day limit reached.', HttpStatus.TOO_MANY_REQUESTS);
    }

    const { winner } = data;
    const preparedGameDto = { winner };
    const game = await this.gameRepository.create(preparedGameDto);

    const firstTeam = await this.playerRepository.find({ id: In(data.firstTeam) });
    const secondTeam = await this.playerRepository.find({ id: In(data.secondTeam) });

    game.players = [...firstTeam, ...secondTeam];
    game.firstTeam = firstTeam;
    game.secondTeam = secondTeam;
    game.createdBy = user;

    await this.gameRepository.save(game);

    return game;
  }
}
