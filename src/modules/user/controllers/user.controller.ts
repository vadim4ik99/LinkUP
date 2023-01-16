/* eslint-disable no-console */
import { Body, Controller, Get, Put, UseGuards } from '@nestjs/common';
import { UserProfileDTO } from '../dto/user-profile.dto';
import { UserService } from '../services/user.service.abstract';
import { UserControllerAbs } from './user.controller.abstract';
import { ImageNameDTO } from '../dto/user-avatar.dto ';

import type { UpdateResult } from 'typeorm';
import { AuthUser, IAuthUser } from 'src/@framework/decorators/auth.decorator';
import { JwtGuard } from 'src/@framework/guard/jwt.guard';
import { UserEntity } from '../entities/user.entity';

@Controller('user')
export class UserController extends UserControllerAbs {

  constructor(private readonly _userService: UserService) {
    super();
  }

  @Put('/edit')
  public override async editProfile(
    @Body() userDto: UserProfileDTO,
  ): Promise<UpdateResult> {
    return await this._userService.editProfile(userDto);
  }

  @UseGuards(JwtGuard)
  @Put('/update-avatar')
  public override async updateAvatar(
    @AuthUser() user: IAuthUser,
    @Body() userAvatar: ImageNameDTO,
  ): Promise<UpdateResult> {
    return await this._userService.updateAvatar(user, userAvatar);
  }

  @UseGuards(JwtGuard)
  @Get('/info')
  public override async getUserInfo(
    @AuthUser() user: IAuthUser,
  ): Promise<UserEntity | null> {
    return await this._userService.getUserInfo(user);
  }

}
