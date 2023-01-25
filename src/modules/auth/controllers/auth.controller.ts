import { Body, Controller, Get, Param, Post, Res, UseGuards } from '@nestjs/common';
import { AuthService } from '../services/auth.service.abstract';
import { RegisterGuard } from '../../../@framework/guard/register.guard';
import { JwtGuard } from '../../../@framework/guard/jwt.guard';
import { AuthUser, IAuthUser } from '../../../@framework/decorators/auth.decorator';
import { UserPasswordDTO } from '../../user/dto/user-password.dto';
import { CreateUserResponseDto } from '../../user/dto/create-user-response.dto';
import { UserEmailDTO } from '../../user/dto/user-email.dto';
import { AuthControllerAbs } from './auth.controller.abstract';
import { ApiBody, ApiCreatedResponse, ApiForbiddenResponse, ApiNotFoundResponse, ApiOkResponse, ApiTags } from '@nestjs/swagger';

import type { UpdateResult } from 'typeorm';
import type { UserLoginDto } from 'src/modules/user/dto/user-login.dto';

@ApiTags('Auth controller')
@Controller('auth')
export class AuthController extends AuthControllerAbs {

  constructor(private readonly _authService: AuthService) {
    super();
  }

  @ApiBody({ type: [CreateUserResponseDto] })
  @ApiCreatedResponse({ description: 'Created Succesfully' })
  @Post('/signup')
  public override async signUp(
    @Body() userDto: CreateUserResponseDto,
  ): Promise<boolean> {
    return this._authService.singUp(userDto);
  }

  @ApiOkResponse({ description: 'The resource was returned successfully' })
  @ApiNotFoundResponse({ description: 'Resource not found' })
  @Get('/email/confirm/:token')
  public override async verifyEmail(@Param('token') token: string): Promise<boolean> {
    return this._authService.verifyEmail(token);
  }

  @ApiBody({ type: [CreateUserResponseDto] })
  @ApiCreatedResponse({ description: 'SingIn Succesfully' })
  @ApiForbiddenResponse({ description: 'Unauthorized Request' })
  @UseGuards(RegisterGuard)
  @Post('/login')
  public override async signIn(
    @Body() userDto: CreateUserResponseDto,
  ): Promise<UserLoginDto> {
    return this._authService.singIn(userDto);
  }

  @ApiBody({ type: [UserEmailDTO] })
  @ApiCreatedResponse({ description: 'Recovery password Succesfully' })
  @ApiForbiddenResponse({ description: 'Unauthorized Request' })
  @UseGuards(RegisterGuard)
  @Post('/recovery')
  public override async forgotPassword(
    @Body() userDto: UserEmailDTO,
  ): Promise<void> {
    return this._authService.forgotPassword(userDto);
  }

  @ApiBody({ type: [UserPasswordDTO] })
  @ApiCreatedResponse({ description: 'Password reset Succesfully' })
  @ApiForbiddenResponse({ description: 'Unauthorized Request' })
  @UseGuards(JwtGuard)
  @Post('/reset-password')
  public override async resetPassword(
    @AuthUser() user: IAuthUser,
    @Body() payload: UserPasswordDTO,
  ): Promise<UpdateResult> {
    return this._authService.resetPassword(user, payload);
  }

  @ApiForbiddenResponse({ description: 'Unauthorized Request' })
  @ApiOkResponse({ description: 'The resource was returned successfully' })
  @UseGuards(JwtGuard)
  @Get('/logout')
  public override async logOut(
    @Res() res: Response,
    @AuthUser() user: IAuthUser,
  ): Promise<void> {
    await this._authService.logOut(user);
    res.headers.set('Authorization', 'null');
  }

}
