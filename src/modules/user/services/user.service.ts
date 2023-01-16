/* eslint-disable no-console */
import { BadRequestException, Inject, Injectable, NotFoundException } from '@nestjs/common';
import { UserRepository } from '../repositories/user.repository';
import { UserService } from './user.service.abstract';
import { genSalt, hash } from 'bcrypt';
import * as fs from 'fs';
import { CommonService } from 'src/modules/common/services/common.service.abstract';

import type { UserEntity } from '../entities/user.entity';
import { Repository, type UpdateResult } from 'typeorm';
import type { UserEmailDTO } from '../dto/user-email.dto';
import type { CreateUserResponseDto } from '../dto/create-user-response.dto';
import type { IAuthUser } from '../../../@framework/decorators/auth.decorator';
import type { UserPasswordDTO } from '../dto/user-password.dto';
import type { UserProfileDTO } from '../dto/user-profile.dto';
import type { ImageNameDTO } from '../dto/user-avatar.dto ';

@Injectable()
export class UserServiceImpl extends UserService {

  constructor(
    @Inject(UserRepository)
    private readonly _usersRepository: Repository<UserEntity>,
    private readonly _commonService: CommonService,
  ) {
    super();
  }

  public override async findUser(
    email: string,
  ): Promise<UserEntity | null> {
    const user = await this._usersRepository.findOneBy({ email });
    return user;
  }

  public override async createUser(
    userDto: CreateUserResponseDto,
  ): Promise<UserEntity> {
    const { email, password, role } = userDto;
    const checkUser = await this.findUser(email);
    if (checkUser != null) {
      throw new BadRequestException('User already exist');
    }
    const salt = await genSalt(10);
    const newUser = {
      email,
      password: await hash(password, salt),
      role,
    };
    return this._usersRepository.save(newUser);
  }

  public override async activateUser(
    userDto: UserEmailDTO,
  ): Promise<UpdateResult> {
    const user = this._usersRepository.findOneBy({ email: userDto.email });
    if (user === null) {
      throw new Error('User is not found');
    }
    return this._usersRepository.update(
      { email: userDto.email },
      { verify: true },
    );
  }

  public override async updateUserPassword(
    user: IAuthUser,
    userDto: UserPasswordDTO,
  ): Promise<UpdateResult> {
    const salt = await genSalt(10);
    const newPassword = await hash(userDto.password, salt);
    return this._usersRepository.update(
      { email: user.email },
      { password: newPassword },
    );
  }

  public override async editProfile(userDto: UserProfileDTO): Promise<UpdateResult> {
    const { id, firstName, lastName } = userDto;
    return this._usersRepository.update({ id }, { firstName, lastName });
  }

  public override async updateAvatar(user: IAuthUser, userAvatar: ImageNameDTO): Promise<UpdateResult> {
    const path = './uploads/' + userAvatar.filename;
    if(!fs.existsSync(path)) {
      throw new NotFoundException('No such file');
    }
    const files = await this._commonService.getImageByName(path);
    console.log(files);
    if(!files) { throw new NotFoundException('No such file in DB'); }
    return await this._usersRepository.update({ id : user.id }, { avatar: files } );
  }

  public override async getUserInfo(user: IAuthUser): Promise<UserEntity | null> {
    return this._usersRepository.findOne({ where: { id: user.id }, relations: ['avatar'] });
  }

}
