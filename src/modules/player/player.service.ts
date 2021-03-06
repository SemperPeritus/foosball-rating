import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { FindManyOptions, FindOneOptions, MoreThan, OrderByCondition, Repository } from 'typeorm';

import { PlayerEntity } from './player.entity';
import { GameEntity } from '../game/game.entity';
import { PlayerDto } from './player.dto';
import { Entities } from '../../constants/entities';
import { Rating } from '../../constants/rating';
import { getRatingForPlayers } from '../../helpers/ratingHelper';
import { merge } from '../../helpers/merge';
import { UserEntity } from '../user/user.entity';
import { fillUpRelations } from '../../helpers/fillUpRelations';

@Injectable()
export class PlayerService {
  constructor(
    @InjectRepository(PlayerEntity) private playerRepository: Repository<PlayerEntity>,
    @InjectRepository(GameEntity) private gameRepository: Repository<GameEntity>,
  ) {}

  async showAll(options?: FindManyOptions<PlayerEntity>) {
    const defaultOptions = { order: { id: 'ASC' } };

    return await this.playerRepository.find(merge(defaultOptions, options));
  }

  async read(id: string, options?: FindOneOptions<PlayerEntity>) {
    // Don't remove type for this line. Needs to compile TS.
    const defaultOrder: OrderByCondition = { 'game.created': 'DESC' };

    const queryBuilder = this.playerRepository.createQueryBuilder('player');
    const playerQueryWithRelations = fillUpRelations(queryBuilder, options.relations);

    const player = await playerQueryWithRelations
      .where('player.id = :id', { id })
      .orderBy(merge(defaultOrder, options.order))
      .getOne();

    if (!player) {
      throw new HttpException('Not Found', HttpStatus.NOT_FOUND);
    }

    return player;
  }

  async checkIsLimitReached(user: UserEntity) {
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    const games = await this.playerRepository.find({ createdBy: user, created: MoreThan(today) });

    return games.length >= Entities.MAX_PLAYERS_PER_DAY;
  }

  async create(data: PlayerDto, user: UserEntity) {
    if (await this.checkIsLimitReached(user)) {
      throw new HttpException('Day limit reached.', HttpStatus.TOO_MANY_REQUESTS);
    }

    const player = await this.playerRepository.create(data);

    player.createdBy = user;

    await this.playerRepository.save(player);

    return player;
  }

  async getPlayersRating() {
    const players = (await this.playerRepository.find()).map(player => {
      player.rating = Rating.PLAYER_DEFAULT_RATING;
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

    return await this.playerRepository.find({ order: { rating: 'DESC' } });
  }
}
