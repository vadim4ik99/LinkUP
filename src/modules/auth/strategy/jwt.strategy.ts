import { ExtractJwt, Strategy } from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

import type { IPayload } from '../interface/payload.interface';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {

  constructor(protected readonly configService: ConfigService) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: configService.get<string>('JWT_SECRET'),
    });
  }

  public validate(payload:IPayload):IPayload {
    return { email: payload.email, password: payload.password };
  }

}
