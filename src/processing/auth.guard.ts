import { Injectable, CanActivate, ExecutionContext, UnauthorizedException } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import * as jwt from 'jsonwebtoken';
import { createQueryBuilder } from 'typeorm';
import { UserEntity } from '../modules/user/user.entity';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(private readonly reflector: Reflector) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const roles = this.reflector.get<number[] | number>('roles', context.getHandler());

    if (!roles) {
      return true;
    }

    const request = context.switchToHttp().getRequest();
    const userId = await this.getUserId(request.headers.token);

    const user = await createQueryBuilder(UserEntity, 'user')
      .where('user.id = :id', { id: userId })
      .getOne();

    if (!user) {
      throw new UnauthorizedException('Invalid token');
    }
    if (typeof roles === 'number') {
      return user.role >= roles;
    }
    if (Array.isArray(roles)) {
      return roles.indexOf(user.role) !== -1;
    }
  }

  async getUserId(token: string): Promise<number> {
    try {
      const user = await jwt.verify(token, process.env.AUTH_SECRET);
      return Number.parseInt((user as any).id, 10);
    } catch (error) {
      throw new UnauthorizedException(error.message || error.name);
    }
  }
}
