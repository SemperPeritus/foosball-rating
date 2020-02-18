import { createParamDecorator } from '@nestjs/common';
import { getRepository } from 'typeorm';
import * as jwt from 'jsonwebtoken';

import { UserEntity } from '../modules/user/user.entity';

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

  const userRepository = getRepository(UserEntity);
  const user = await userRepository.findOne(userId);

  return user.toResponseObject();
});
