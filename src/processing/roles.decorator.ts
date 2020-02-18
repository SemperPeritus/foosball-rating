import { SetMetadata } from '@nestjs/common';

export const AllowRoles = (roles: number[]) => SetMetadata('roles', roles);

export const RequireMinimalRole = (minimalRole: number) => SetMetadata('roles', minimalRole);
