import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

import type { CanActivate, ExecutionContext } from '@nestjs/common';
import type { Request } from 'express';
import type { IPayload } from '../interface/payload.interface';
import type { IJwttoken } from '../interface/jwttoken.interface';

@Injectable()
export class AuthorizationGuard implements CanActivate {

  constructor(private readonly jwtService: JwtService) {}

  public canActivate(context: ExecutionContext): boolean | Promise<boolean> {
    const request = context.switchToHttp().getRequest<Request>();
    const { access_token } = request.body as IJwttoken ;
    const payload = this.jwtService.verify(access_token) as IPayload;
    if (!payload) {return true;}
    return false;
  }

}

