import { PassportStrategy } from '@nestjs/passport';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { Strategy } from 'passport-local';
import { AuthService } from '../../modules/auth/services/auth.service.abstract';

import type { UserLoginDto } from 'src/modules/user/dto/user-login.dto';
import type { UserTypeEnum } from 'src/modules/user/entities/user.entity';

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {

  constructor(private readonly authService: AuthService) {
    super({
      usernameField: 'email',
    });
  }

  public async validate(
    email: string,
    password: string,
    role: UserTypeEnum,
  ): Promise<UserLoginDto> {
    const userDto = { email, password, role };
    const user = await this.authService.singIn(userDto);
    if (!user) {
      throw new UnauthorizedException();
    }
    return user;
  }

}
