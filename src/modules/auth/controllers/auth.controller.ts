import { Body, Controller, Get, Param, Post, UseGuards } from '@nestjs/common';
import { AuthService } from '../services/auth.service.abstract';
import { RegisterGuard } from '../guard/register.guard';
import { AuthorizationGuard } from '../guard/authorization.guard';
import { AuthUser } from '../auth.decorator';

import type { UpdateResult } from 'typeorm';
import type { UserDTO } from 'src/modules/user/dto/user.dto';
import type { UserEntity } from 'src/modules/user/entities/user.entity';

@Controller('auth')
export class AuthController {

  constructor(private readonly authService: AuthService) {}

  @Post('/signup')
  public async signUp(
    @Body() userDto: Pick<UserDTO, 'email' | 'password'>,
  ): Promise<boolean> {
    return this.authService.singUp(userDto);
  }

  @UseGuards(RegisterGuard)
  @Get('/email/confirm')
  public async verifyEmail(@Param('token') token: string): Promise<boolean> {
    return this.authService.verifyEmail(token);
  }

  @UseGuards(RegisterGuard)
  @Post('/login')
  public async signIn(
    @Body() userDto: Pick<UserDTO, 'email' | 'password'>,
  ): Promise<UserEntity> {
    return this.authService.singIn(userDto);
  }

  @UseGuards(RegisterGuard)
  @Post('/recovery')
  public async forgotPassword(
    @Body() userDto: Pick<UserDTO, 'email'>,
  ): Promise<void> {
    return this.authService.forgotPassword(userDto);
  }

  @UseGuards(AuthorizationGuard)
  @Post('/reset-password')
  public async resetPassword(
    @AuthUser() user: AuthUser,
    @Body() payload: Pick<UserDTO, 'password'>,
  ): Promise<UpdateResult> {
    return this.authService.resetPassword(user, payload);
  }

}
