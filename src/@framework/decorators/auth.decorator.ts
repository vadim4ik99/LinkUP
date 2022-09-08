/* eslint-disable no-console */
import { createParamDecorator } from '@nestjs/common';

import type { ExecutionContext } from '@nestjs/common';
import type { Request } from 'express';
import type { UserType } from './authorization.decorator';

export interface IAuthUser {
  email: string;
  role: UserType;
}

export const AuthUser = createParamDecorator(
  (_data: unknown, ctx: ExecutionContext) => {
    const request = ctx.switchToHttp().getRequest<Request>();
    return request.user as IAuthUser;
  },
);
