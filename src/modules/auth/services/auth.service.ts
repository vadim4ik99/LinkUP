import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { compare } from 'bcrypt';
import { UserServiceImpl } from 'src/modules/user/services/user.service';
import { AuthService } from './auth.service.abstract';
import { EmailTamplate, MailServiceImpl } from 'src/modules/mail/services/mail.service';
import { jwt_decode } from 'jwt-decode'

import type { UserEntity } from 'src/modules/user/entities/user.entity';
import type { UserDTO } from 'src/modules/user/dto/user.dto';
import { JwtStrategy } from '../strategy/jwt.strategy';

@Injectable()
export class AuthServiceImpl extends AuthService {

  constructor(
    private readonly jwtService: JwtService,
    private readonly jwtStrategy: JwtStrategy,
    private readonly userService: UserServiceImpl,
    private readonly mailService: MailServiceImpl,
  ) {
    super();
  }

  public override async validateUser(email: string, pass: string): Promise<UserEntity> {
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

  /*   public override async login(email: string): Promise<string> {
    const payload = { email };
    return await this.jwtService.signAsync(payload);
  } */

  public override async generateToken(email: string, expiresIn: string, id: number): Promise<string> {
    const payload = { id, email , expiresIn };
    return await this.jwtService.signAsync(payload);
  }

  public override async singUp(userDto: Pick<UserDTO, 'email' | 'password'>): Promise<void> {
    const user = this.userService.createUser(userDto);
    await this.sendWelcomeEmail(await user);
  }

  public override async sendWelcomeEmail (user: Pick<UserDTO,'email' | 'id'>): Promise<void> {
    const token: string = await this.generateToken(user.email, '1d' , user.id );
    await this.mailService.sendEmail(user.email,'Welcome to site', token, EmailTamplate.Welcome);
  }

  public override async verifyEmail (token: string): Promise<void> {
    const isActive = this.jwtStrategy.validate();
    if (!isActive) { throw new UnauthorizedException('You have wrong token'); }
    const data = jwt_decode(token);
    await this.userService.activateUser(data.id);

  }

}
