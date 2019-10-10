import { ArgumentMetadata, HttpException, HttpStatus, Injectable, PipeTransform } from '@nestjs/common';
import { UserRegisterDto } from './userRegister.dto';
import { getRepository } from 'typeorm';
import { PlayerEntity } from '../player/player.entity';

@Injectable()
export class UserValidationPipe implements PipeTransform<any> {
  async transform(value: any, metadata: ArgumentMetadata) {
    if (metadata.type !== 'body') {
      return value;
    }

    const user: UserRegisterDto = value;

    if (!user.playerWanted && !user.firstName) {
      throw new HttpException(`Validation failed: You should either create or select player`, HttpStatus.BAD_REQUEST);
    }

    const playerRepository = getRepository(PlayerEntity);
    const player = await playerRepository.findOne(user.playerWanted);
    if (!player) {
      throw new HttpException(`Validation failed: The player does not exists.`, HttpStatus.BAD_REQUEST);
    }
    if (player.user) {
      throw new HttpException(
        `Validation failed: The player is already taken. Contact the administrators if this is you.`,
        HttpStatus.BAD_REQUEST,
      );
    }

    return user;
  }
}
