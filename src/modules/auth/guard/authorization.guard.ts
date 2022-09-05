import { applyDecorators, SetMetadata } from '@nestjs/common';
import { UseGuards } from '@nestjs/common';
import { JwtGuard } from './jwt.guard';
import { RegisterGuard } from './register.guard';

import type { RoleEnum } from '../role.enum';

type AuthorizationReturnType = ReturnType<typeof applyDecorators>

export const REQUIRED_USER_TYPES = 'required_user_types';

export const Authorization = (requiredUserTypes?: RoleEnum[]): AuthorizationReturnType => {
  const guardDecorators = [UseGuards(RegisterGuard, JwtGuard)];
  if (requiredUserTypes) {
    guardDecorators.push(SetMetadata(REQUIRED_USER_TYPES, requiredUserTypes ));
  }

  return applyDecorators(...guardDecorators);
};
