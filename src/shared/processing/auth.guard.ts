import { Injectable, CanActivate, ExecutionContext, UnauthorizedException } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import * as jwt from 'jsonwebtoken';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(private readonly reflector: Reflector) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const roles = this.reflector.get<string[] | number>('roles', context.getHandler());

    const request = context.switchToHttp().getRequest();
    const user = await this.getUser(request.headers.token);

    if (!roles) {
      return true;
    }

    if (typeof roles === 'number') {
      return user.role >= roles;
    }
    if (Array.isArray(roles)) {
      return roles.indexOf(user.role) !== -1;
    }

    throw new UnauthorizedException(user.message || user.name);
  }

  async getUser(token: string) {
    try {
      return jwt.verify(token, process.env.AUTH_SECRET);
    } catch (error) {
      return error;
    }
  }
}
