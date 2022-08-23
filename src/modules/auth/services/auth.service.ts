import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { compare } from 'bcrypt';
import type { UserEntity } from 'src/modules/user/entities/user.entity';
import { UserServiceImpl } from 'src/modules/user/services/user.service';
import { AuthService } from './auth.service.abstract';

@Injectable()
export class AuthServiceImpl extends AuthService {

  constructor(
    private readonly jwtService: JwtService,
    private readonly userService: UserServiceImpl,
  ) {
    super();
  }

  public async validateUser(email: string, pass: string): Promise<UserEntity> {
    const user = await this.userService.findUser(email);
    if (!user) {
      throw new UnauthorizedException('User not found');
    }
    const correctPassword = await compare(pass, user.password);
    if (!correctPassword) {
      throw new UnauthorizedException('Worng password');
    }
    return user;
  }

  public async login(email: string): Promise<unknown> {
    const payload = { email };
    return {
      access_token: await this.jwtService.signAsync(payload),
    };
  }

}
