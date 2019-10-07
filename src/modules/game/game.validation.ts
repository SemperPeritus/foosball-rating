import { ArgumentMetadata, HttpException, HttpStatus, Injectable, PipeTransform } from '@nestjs/common';
import { checkUnique } from '../../shared/helpers/checkUnique';

@Injectable()
export class GameValidationPipe implements PipeTransform<any> {
  transform(value: any, metadata: ArgumentMetadata) {
    const players = [...value.firstTeam, ...value.secondTeam];
    const isUnique = checkUnique(players);

    if (!isUnique) {
      throw new HttpException(`Validation failed: Players are not unique`, HttpStatus.BAD_REQUEST);
    }

    return value;
  }
}
