/* eslint-disable no-console */
import {
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { compare } from 'bcrypt';
import { UserService } from '../../user/services/user.service.abstract';
import { MailService } from '../../mail/services/mail.service.abstract';
import { AuthService } from './auth.service.abstract';
import { EmailTamplate } from '../../mail/services/mail.service';
import { ConfigService } from '@nestjs/config';
import { plainToClass } from 'class-transformer';
import { UserLoginDto } from '../../user/dto/user-login.dto';

import type { IPayload } from '../interface/payload.interface';
import type { UpdateResult } from 'typeorm/query-builder/result/UpdateResult';
import type { IAuthUser } from '../decorators/auth.decorator';
import type { CreateUserResponseDto } from '../../user/dto/create-user-response.dto';
import type { UserEmailDTO } from '../../user/dto/user-email.dto';
import type { UserPasswordDTO } from '../../user/dto/user-password.dto';

@Injectable()
export class AuthServiceImpl extends AuthService {

  constructor(
    private readonly _jwtService: JwtService,
    private readonly _userService: UserService,
    private readonly _mailService: MailService,
    private readonly _configService: ConfigService,
  ) {
    super();
  }

  public override async singIn(
    userDto: CreateUserResponseDto,
  ): Promise<UserLoginDto> {
    const password = userDto.password;
    const user = await this._userService.findUser(userDto);
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
    const userLoginDto = plainToClass(UserLoginDto, user);
    return userLoginDto;
  }

  public override async singUp(
    userDto: CreateUserResponseDto,
  ): Promise<boolean> {
    const user = await this._userService.createUser(userDto);
    await this.sendEmailTemplate(user, EmailTamplate.Welcome);
    return true;
  }

  public override async sendEmailTemplate(
    userDto: UserEmailDTO,
    tamplate: EmailTamplate,
  ): Promise<void> {
    const expiresIn = { expiresIn: '1d' };
    const token = await this._jwtService.signAsync(userDto, expiresIn);
    await this._mailService.sendEmail(
      userDto.email,
      'Welcome to site',
      tamplate,
      token,
    );
  }

  public override async verifyEmail(token: string): Promise<boolean> {
    const secret = { secret: this._configService.get<string>('JWT_SECRET') };
    const data = this._jwtService.verify(token, secret) as IPayload;
    await this._userService.activateUser(data);
    return true;
  }

  public override async forgotPassword(
    userDto: UserEmailDTO,
  ): Promise<void> {
    const user = await this._userService.findUser(userDto);
    if (!user) {
      throw new NotFoundException('Wrong email');
    }
    await this.sendEmailTemplate(user, EmailTamplate.ForgotPassword);
  }

  public override async resetPassword(
    user: IAuthUser,
    userDto: UserPasswordDTO,
  ): Promise<UpdateResult> {
    return this._userService.updateUserPassword(user, userDto);
  }

  public override async loginJwt(
    userDto: CreateUserResponseDto,
  ): Promise<unknown> {
    const payload = { email: userDto.email, password: userDto.password };
    const token = await this._jwtService.signAsync(payload);
    return token;
  }

}
