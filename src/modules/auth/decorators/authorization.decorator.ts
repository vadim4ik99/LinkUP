import { applyDecorators, SetMetadata } from '@nestjs/common';
import { UseGuards } from '@nestjs/common';
import { JwtGuard } from '../guard/jwt.guard';
import { RegisterGuard } from '../guard/register.guard';

import type { RoleEnum } from '../role.enum';

type AuthorizationReturnType = ReturnType<typeof applyDecorators>

export const REQUIRED_USER_TYPES = 'role';

export const Authorization = (requiredUserTypes?: RoleEnum[]): AuthorizationReturnType => {
  const guardDecorators = [UseGuards(RegisterGuard, JwtGuard)];
  if (requiredUserTypes) {
    guardDecorators.push(SetMetadata(REQUIRED_USER_TYPES, requiredUserTypes ));
  }

  return applyDecorators(...guardDecorators);
};