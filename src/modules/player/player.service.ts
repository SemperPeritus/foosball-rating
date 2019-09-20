import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { PlayerEntity } from './player.entity';
import { PlayerDto } from './player.dto';
import { ENTITIES } from '../../shared/constants/entities';

@Injectable()
export class PlayerService {
  constructor(@InjectRepository(PlayerEntity) private playerRepository: Repository<PlayerEntity>) {}

  async showAll() {
    return await this.playerRepository.find();
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
    player.rating = ENTITIES.PLAYER_DEFAULT_RATING;

    await this.playerRepository.save(player);

    return player;
  }
}
