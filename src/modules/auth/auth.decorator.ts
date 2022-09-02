/* eslint-disable no-console */
import { createParamDecorator } from '@nestjs/common';

import type { ExecutionContext } from '@nestjs/common';
import type { Request } from 'express';

export interface AuthUser {
  email: string;
}

export const AuthUser = createParamDecorator(
  (_data: unknown, ctx: ExecutionContext) => {
    const request = ctx.switchToHttp().getRequest<Request>();
    return request.user as AuthUser;
  },
);
