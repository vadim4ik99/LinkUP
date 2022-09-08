import { Injectable } from '@nestjs/common';
import { Reflector } from '@nestjs/core';

import type { Request } from 'express';
import type { CanActivate, ExecutionContext } from '@nestjs/common';
import type { IAuthUser } from '../decorators/auth.decorator';
import type { UserType } from '../decorators/authorization.decorator';

@Injectable()
export class RoleGuard implements CanActivate  {

  constructor(private reflector: Reflector) {}
  public canActivate(context: ExecutionContext): boolean | Promise<boolean> {
    const requiredRoles = this.reflector.getAllAndOverride<UserType[]>('role', [
      context.getHandler(),
      context.getClass(),
    ]);
    const request = context.switchToHttp().getRequest() as Request;
    const user = request.user as IAuthUser;
    return requiredRoles.some((role) => user.role?.includes(role));
  }

}
