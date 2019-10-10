import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { FindManyOptions, FindOneOptions, Repository } from 'typeorm';

import { UserEntity } from './user.entity';
import { PlayerEntity } from '../player/player.entity';
import { UserLoginDto } from './userLogin.dto';
import { UserRegisterDto } from './userRegister.dto';
import { Entities } from '../../shared/constants/entities';
import { merge } from '../../shared/helpers/merge';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(UserEntity) private userRepository: Repository<UserEntity>,
    @InjectRepository(PlayerEntity) private playerRepository: Repository<PlayerEntity>,
  ) {}

  async showAll(options?: FindManyOptions<UserEntity>) {
    // Don't remove type for this line. Needs to compile TS.
    const defaultOptions: FindManyOptions<UserEntity> = { order: { id: 'ASC' } };

    const users = await this.userRepository.find(merge(defaultOptions, options));

    return users.map(user => user.toResponseObject());
  }

  async read(id: string, options?: FindOneOptions<UserEntity>) {
    const user = await this.userRepository.findOne(id, options);

    if (!user) {
      throw new HttpException('Not Found', HttpStatus.NOT_FOUND);
    }

    return user.toResponseObject();
  }

  async login(data: UserLoginDto) {
    const { username, password } = data;
    const user = await this.userRepository.findOne({ username });
    if (!user || !(await user.comparePassword(password))) {
      throw new HttpException('Invalid username/password', HttpStatus.BAD_REQUEST);
    }

    return user.toResponseObject(true);
  }

  async register(data: UserRegisterDto) {
    const { username, password, firstName, secondName, playerWanted: playerWantedId } = data;
    const user = await this.userRepository.findOne({ username });
    if (user) {
      throw new HttpException('User already exists', HttpStatus.BAD_REQUEST);
    }

    let player = null;
    let playerWanted = null;
    if (playerWantedId) {
      playerWanted = await this.playerRepository.findOne({ id: playerWantedId });
    } else {
      player = new PlayerEntity();

      player.firstName = firstName;
      player.secondName = secondName;
      player.rating = Entities.PLAYER_DEFAULT_RATING;

      await this.playerRepository.save(player);
    }

    const newUser = await this.userRepository.create({ username, password, playerWanted });
    newUser.player = player;

    await this.userRepository.save(newUser);

    return newUser.toResponseObject(true);
  }
}
