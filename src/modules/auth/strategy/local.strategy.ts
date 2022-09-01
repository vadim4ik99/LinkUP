import { PassportStrategy } from '@nestjs/passport';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { Strategy } from 'passport-local';
import { AuthService } from '../services/auth.service.abstract';

import type { UserEntity } from 'src/modules/user/entities/user.entity';

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {

  constructor(private readonly authService: AuthService) {
    super();
  }

  public async validate(
    username: string,
    password: string,
  ): Promise<UserEntity> {
    const userDto = { email: username, password };
    const user = await this.authService.singIn(userDto);
    if (!user) {
      throw new UnauthorizedException();
    }
    return user;
  }

}
