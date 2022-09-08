/* eslint-disable no-console */
import { applyDecorators, SetMetadata } from '@nestjs/common';
import { UseGuards } from '@nestjs/common';
import { JwtGuard } from '../guard/jwt.guard';
import { RoleGuard } from '../guard/roles.guard';

type AuthorizationReturnType = ReturnType<typeof applyDecorators>

export type UserType = 'vendor' | 'customer';

export const REQUIRED_USER_TYPES = 'role';

export const Authorization = (requiredUserTypes?: UserType[]): AuthorizationReturnType => {
  const guardDecorators = [UseGuards( JwtGuard, RoleGuard)];
  if (requiredUserTypes) {
    guardDecorators.push(SetMetadata(REQUIRED_USER_TYPES, requiredUserTypes ));
  }

  return applyDecorators(...guardDecorators);
};
