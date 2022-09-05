/* eslint-disable no-console */
import { Body, Controller, Get, Param, Post, UseGuards } from '@nestjs/common';
import { AuthService } from '../services/auth.service.abstract';
import { RegisterGuard } from '../guard/register.guard';
import { JwtGuard } from '../guard/jwt.guard';
import { AuthUser, IAuthUser } from '../auth.decorator';
import { UserPasswordDTO } from '../../user/dto/user-password.dto';
import { CreateUserResponseDto } from '../../user/dto/create-user-response.dto';
import { UserEmailDTO } from '../../user/dto/user-email.dto';
import { AuthController } from './auth.controller.abstract';

import type { UpdateResult } from 'typeorm';
import type { UserEntity } from '../../user/entities/user.entity';

@Controller('auth')
export class AuthControllerImp extends AuthController {

  constructor(private readonly _authService: AuthService) {
    super();
  }

  @Post('/signup')
  public async signUp(
    @Body() userDto: CreateUserResponseDto,
  ): Promise<boolean> {
    return this._authService.singUp(userDto);
  }

  @Get('/email/confirm/:token')
  public async verifyEmail(@Param('token') token: string): Promise<boolean> {
    return this._authService.verifyEmail(token);
  }

  @UseGuards(RegisterGuard)
  @Post('/login')
  public async signIn(
    @Body() userDto: CreateUserResponseDto,
  ): Promise<UserEntity> {
    return this._authService.singIn(userDto);
  }

  @UseGuards(RegisterGuard)
  @Post('/recovery')
  public async forgotPassword(
    @Body() userDto: UserEmailDTO,
  ): Promise<void> {
    return this._authService.forgotPassword(userDto);
  }

  @UseGuards(JwtGuard)
  @Post('/reset-password')
  public async resetPassword(
    @AuthUser() user: IAuthUser,
    @Body() payload: UserPasswordDTO,
  ): Promise<UpdateResult> {
    return this._authService.resetPassword(user, payload);
  }

}
