import { createParamDecorator } from '@nestjs/common';
import { createQueryBuilder } from 'typeorm';
import * as jwt from 'jsonwebtoken';

import { UserEntity } from '../../modules/user/user.entity';

const getUserId = async (token: string): Promise<number> => {
  try {
    const user = await jwt.verify(token, process.env.AUTH_SECRET);
    return Number.parseInt((user as any).id, 10);
  } catch (error) {
    return null;
  }
};

export const User = createParamDecorator(async (data, req) => {
  const userId = await getUserId(req.headers.token);
  if (!userId) {
    return null;
  }

  const user = await createQueryBuilder(UserEntity, 'user')
    .leftJoinAndSelect('user.player', 'player')
    .where('user.id = :id', { id: userId })
    .getOne();

  return user.toResponseObject();
});
