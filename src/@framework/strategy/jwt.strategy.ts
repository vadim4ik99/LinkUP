import { ExtractJwt, Strategy } from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { UserService } from 'src/modules/user/services/user.service.abstract';

import type { IPayload } from '../../modules/auth/interface/payload.interface';
import type { UserEntity } from 'src/modules/user/entities/user.entity';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {

  constructor(
    protected readonly _configService: ConfigService,
    private readonly _userService: UserService,
  ) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: _configService.get<string>('JWT_SECRET'),
    });
  }

  public async validate(payload: IPayload): Promise<UserEntity | null> {
    const user = await this._userService.findUser(payload.email);
    if (!user) { return null; }
    return user;
  }

}
