import { createParamDecorator } from '@nestjs/common';

import type { ExecutionContext } from '@nestjs/common';
import type { Request } from 'express';
import type { RoleEnum } from '../role.enum';

export interface IAuthUser {
  email: string;
  role: RoleEnum;
}

export const AuthUser = createParamDecorator(
  (_data: unknown, ctx: ExecutionContext) => {
    const request = ctx.switchToHttp().getRequest<Request>();
    return request.user as IAuthUser;
  },
);
