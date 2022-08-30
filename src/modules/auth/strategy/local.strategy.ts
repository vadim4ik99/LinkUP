import { PassportStrategy } from '@nestjs/passport';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { Strategy } from 'passport-local';
import { AuthServiceImpl } from '../services/auth.service';

import type { UserEntity } from 'src/modules/user/entities/user.entity';

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {

  constructor(private readonly authService: AuthServiceImpl) {
    super();
  }

  public async validate(username: string, password: string): Promise<UserEntity> {
    const userDto = { email: username, password };
    const user = await this.authService.singIn(userDto);
    if (!user) { throw new UnauthorizedException(); }
    return user;
  }

}
