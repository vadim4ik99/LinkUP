/* eslint-disable no-console */
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

import type { CanActivate, ExecutionContext } from '@nestjs/common';
import type { Request } from 'express';
import type { IPayload } from '../interface/payload.interface';

@Injectable()
export class AuthorizationGuard implements CanActivate {

  constructor(private readonly jwtService: JwtService) {}

  public canActivate(context: ExecutionContext): boolean | Promise<boolean> {
    const request = context.switchToHttp().getRequest<Request>();
    const token = request.headers['authorization']?.slice(7);
    if (!token) {
      throw new UnauthorizedException('You must login');
    }
    const payload = this.jwtService.verify(token) as IPayload;
    if (!payload) { return false;}
    return true;
  }

}

