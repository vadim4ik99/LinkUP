import { Body, Controller, Get, Param, Post, UseGuards } from '@nestjs/common';
import { AuthService } from '../services/auth.service.abstract';
import { LocalAuthGuard } from '../guard/local-auth.guard';
import { JwtAuthGuard } from '../guard/jwt.guard';

import type { UserDTO } from 'src/modules/user/dto/user.dto';
import type { UserEntity } from 'src/modules/user/entities/user.entity';

@Controller('auth')
export class AppController {

  constructor( private readonly authService: AuthService) {}

  @Post('/signup')
  public async signUp (@Body() userDto: Pick<UserDTO, 'email' | 'password'>): Promise<boolean> {
    return this.authService.singUp(userDto);
  }

  @Get('/confirmemail')
  public async verifyEmail (@Param('token') token: string): Promise<boolean> {
    return this.authService.verifyEmail(token);
  }

  @UseGuards(LocalAuthGuard)
  @Post('/login')
  public async signIn (@Body() userDto: Pick<UserDTO, 'email' | 'password'>): Promise<UserEntity> {
    return this.authService.singIn(userDto);
  }

  @UseGuards(JwtAuthGuard)
  @Post('/recovery')
  public async forgotPassword (@Body() userDto: Pick<UserDTO, 'email'>): Promise<void> {
    return this.authService.forgotPassword(userDto);
  }

  /*   @Post('/newpassword') /// як тут з body?
  public async resetPassword (@Body() token: string,  userDto: Pick<UserDTO, 'password'>) {
    return this.authService.resetPassword(token, userDto);
  } */

}
