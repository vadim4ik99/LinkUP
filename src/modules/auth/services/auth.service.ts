/* eslint-disable no-console */
import {
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { compare } from 'bcrypt';
import { UserService } from '../../user/services/user.service.abstract';
//import { MailService } from '../../mail/services/mail.service.abstract';
import { AuthService } from './auth.service.abstract';
import { EmailTamplate } from '../../mail/services/mail.service';
import { ConfigService } from '@nestjs/config';

import type { IPayload } from '../interface/payload.interface';
import type { UpdateResult } from 'typeorm/query-builder/result/UpdateResult';
import type { UserEntity } from '../../user/entities/user.entity';
import type { AuthUser } from '../auth.decorator';
import type { CreateUserResponseDto } from '../../user/dto/create-user-response.dto';
import type { UserEmailDTO } from '../../user/dto/user-email.dto';
import type { UserPasswordDTO } from '../../user/dto/user-password.dto';

@Injectable()
export class AuthServiceImpl extends AuthService {

  constructor(
    private readonly jwtService: JwtService,
    private readonly userService: UserService,
    //private readonly mailService: MailService,
    private readonly configService: ConfigService,
  ) {
    super();
  }

  public override async singIn(
    userDto: CreateUserResponseDto,
  ): Promise<UserEntity> {
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

  public override async singUp(
    userDto: CreateUserResponseDto,
  ): Promise<boolean> {
    const user = await this.userService.createUser(userDto);
    await this.sendEmailTemplate(user, EmailTamplate.Welcome);
    return true;
  }

  public override async sendEmailTemplate(
    userDto: UserEmailDTO,
    tamplate: EmailTamplate,
  ): Promise<void> {
    const expiresIn = { expiresIn: '1d' };
    await this.jwtService.signAsync(userDto, expiresIn);
    tamplate;
    /*
    await this.mailService.sendEmail(
      userDto.email,
      'Welcome to site',
      tamplate,
      token,
    );*/
  }

  public override async verifyEmail(token: string): Promise<boolean> {
    const secret = { secret: this.configService.get<string>('JWT_SECRET') };
    const data = this.jwtService.verify(token, secret) as IPayload;
    await this.userService.activateUser(data);
    return true;
  }

  public override async forgotPassword(
    userDto: UserEmailDTO,
  ): Promise<void> {
    const user = await this.userService.findUser(userDto);
    if (!user) {
      throw new NotFoundException('Wrong email');
    }
    await this.sendEmailTemplate(user, EmailTamplate.ForgotPassword);
  }

  public override async resetPassword(
    user: AuthUser,
    userDto: UserPasswordDTO,
  ): Promise<UpdateResult> {
    return this.userService.updateUserPassword(user, userDto);
  }

  public override async loginJwt(
    userDto: CreateUserResponseDto,
  ): Promise<unknown> {
    const payload = { email: userDto.email, password: userDto.password };
    const token = await this.jwtService.signAsync(payload);
    return token;
  }

}
