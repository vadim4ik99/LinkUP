import { Body, Controller, Get, Param, Post, UseGuards } from '@nestjs/common';
import { AuthService } from '../services/auth.service.abstract';
import { RegisterGuard } from '../../../@framework/guard/register.guard';
import { JwtGuard } from '../../../@framework/guard/jwt.guard';
import { AuthUser, IAuthUser } from '../../../@framework/decorators/auth.decorator';
import { UserPasswordDTO } from '../../user/dto/user-password.dto';
import { CreateUserResponseDto } from '../../user/dto/create-user-response.dto';
import { UserEmailDTO } from '../../user/dto/user-email.dto';
import { AuthControllerAbs } from './auth.controller.abstract';

import type { UpdateResult } from 'typeorm';
import type { UserLoginDto } from 'src/modules/user/dto/user-login.dto';

@Controller('auth')
export class AuthController extends AuthControllerAbs {

  constructor(private readonly _authService: AuthService) {
    super();
  }

  @Post('/signup')
  public override async signUp(
    @Body() userDto: CreateUserResponseDto,
  ): Promise<boolean> {
    return this._authService.singUp(userDto);
  }

  @Get('/email/confirm/:token')
  public override async verifyEmail(@Param('token') token: string): Promise<boolean> {
    return this._authService.verifyEmail(token);
  }

  @UseGuards(RegisterGuard)
  @Post('/login')
  public override async signIn(
    @Body() userDto: CreateUserResponseDto,
  ): Promise<UserLoginDto> {
    return this._authService.singIn(userDto);
  }

  @UseGuards(RegisterGuard)
  @Post('/recovery')
  public override async forgotPassword(
    @Body() userDto: UserEmailDTO,
  ): Promise<void> {
    return this._authService.forgotPassword(userDto);
  }

  @UseGuards(JwtGuard)
  @Post('/reset-password')
  public override async resetPassword(
    @AuthUser() user: IAuthUser,
    @Body() payload: UserPasswordDTO,
  ): Promise<UpdateResult> {
    return this._authService.resetPassword(user, payload);
  }

}
