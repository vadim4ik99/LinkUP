import { Body, Controller, Put } from '@nestjs/common';
import { UserProfileDTO } from '../dto/user-profile.dto';
import { UserService } from '../services/user.service.abstract';
import { UserControllerAbs } from './user.controller.abstract';
import type { UserDTO } from '../dto/user.dto';

@Controller('user')
export class UserController extends UserControllerAbs {

  constructor(private readonly _userService: UserService) {
    super();
  }

  @Put('/edit')
  public override async editProfile(
    @Body() userDto: UserProfileDTO,
  ): Promise<UserDTO> {
    return this._userService.editProfile(userDto);
  }

}
