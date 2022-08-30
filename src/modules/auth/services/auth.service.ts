import { Injectable, NotFoundException, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { compare } from 'bcrypt';
import { UserServiceImpl } from 'src/modules/user/services/user.service';
import { AuthService } from './auth.service.abstract';
import { EmailTamplate, MailServiceImpl } from 'src/modules/mail/services/mail.service';
import { ConfigService } from '@nestjs/config';
import type { IPayload } from '../interface/payload.interface';
import type { UpdateResult } from 'typeorm/query-builder/result/UpdateResult';

import type { UserDTO } from 'src/modules/user/dto/user.dto';
import type { UserEntity } from 'src/modules/user/entities/user.entity';

@Injectable()
export class AuthServiceImpl extends AuthService {

  constructor(
    private readonly jwtService: JwtService,
    private readonly userService: UserServiceImpl,
    private readonly mailService: MailServiceImpl,
    private readonly configService: ConfigService,
  ) {
    super();
  }

  public override async singIn(userDto: Pick<UserDTO, 'email' | 'password'>): Promise<UserEntity> {
    const password = userDto.password;
    const user = await this.userService.findUser(userDto);
    if (!user) {
      throw new UnauthorizedException('User not found');
    }
    const correctPassword = await compare(password, user.password);
    if (!correctPassword) {
      throw new UnauthorizedException('Worng password');
    }
    if (user.verify == false) {
      throw new UnauthorizedException('You not activated account');
    }
    await this.loginJwt(user);
    return user;
  }

  public override async singUp(userDto: Pick<UserDTO, 'email' | 'password'>): Promise<boolean> {
    const user = await this.userService.createUser(userDto);
    await this.sendEmailTemplate(user, EmailTamplate.Welcome);
    return true;
  }

  public override async sendEmailTemplate (user: Pick<UserDTO,'email'>, tamplate: EmailTamplate): Promise<void> {
    const expiresIn = { expiresIn: '1d' };
    const token = await this.jwtService.signAsync(user, expiresIn);
    await this.mailService.sendEmail(user.email,'Welcome to site', tamplate, token);
  }

  public override async verifyEmail (token: string): Promise<boolean> {
    const secret = { secret: this.configService.get<string>('JWT_SECRET') };
    const data = this.jwtService.verify(token, secret) as IPayload;
    await this.userService.activateUser(data.email);
    return true;
  }

  public override async forgotPassword (userDto: Pick<UserDTO, 'email'>): Promise<void> {
    const user = await this.userService.findUser(userDto);
    if(!user) {
      throw new NotFoundException('Wrong email');
    }
    await this.sendEmailTemplate(user, EmailTamplate.ForgotPassword);
  }

  public override async resetPassword (token: string, userDto: Pick<UserDTO, 'password'>): Promise<UpdateResult> {
    const secret = { secret: this.configService.get<string>('JWT_SECRET') };
    const data = this.jwtService.verify(token, secret) as IPayload;
    return this.userService.updateUserPassword(data.email, userDto.password);
  }

  public override async loginJwt (userDto: Pick<UserDTO, 'password' | 'email'>): Promise<unknown> {
    const payload = { username : userDto.email, password: userDto.password };
    return { access_token: await this.jwtService.signAsync(payload) };
  }

}
