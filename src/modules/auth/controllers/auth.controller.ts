/* eslint-disable no-console */
import { Body, Controller, Get, Param, Post, UseGuards } from '@nestjs/common';
import { AuthService } from '../services/auth.service.abstract';
import { RegisterGuard } from '../guard/register.guard';
import { AuthorizationGuard } from '../guard/authorization.guard';
import { AuthUser } from '../auth.decorator';

import type { UpdateResult } from 'typeorm';
import type { UserEntity } from '../../user/entities/user.entity';
import { UserPasswordDTO } from '../../user/dto/user-password.dto';
import { CreateUserResponseDto } from '../../user/dto/create-user-response.dto';
import { UserEmailDTO } from '../../user/dto/user-email.dto';

@Controller('auth')
export class AuthController {

  constructor(private readonly authService: AuthService) {}

  @Post('/signup')
  public async signUp(
    @Body() userDto: CreateUserResponseDto,
  ): Promise<boolean> {
    return this.authService.singUp(userDto);
  }

  @Get('/email/confirm/:token')
  public async verifyEmail(@Param('token') token: string): Promise<boolean> {
    return this.authService.verifyEmail(token);
  }

  @UseGuards(RegisterGuard)
  @Post('/login')
  public async signIn(
    @Body() userDto: CreateUserResponseDto,
  ): Promise<UserEntity> {
    return this.authService.singIn(userDto);
  }

  @UseGuards(RegisterGuard)
  @Post('/recovery')
  public async forgotPassword(
    @Body() userDto: UserEmailDTO,
  ): Promise<void> {
    return this.authService.forgotPassword(userDto);
  }

  @UseGuards(AuthorizationGuard)
  @Post('/reset-password')
  public async resetPassword(
    @AuthUser() user: AuthUser,
    @Body() payload: UserPasswordDTO,
  ): Promise<UpdateResult> {
    console.log(user);
    return this.authService.resetPassword(user, payload);
  }

}
