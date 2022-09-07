/* eslint-disable no-console */
import { BadRequestException, Inject, Injectable } from '@nestjs/common';
import { UserRepository } from '../repositories/user.repository';
import { UserService } from './user.service.abstract';
import { genSalt, hash } from 'bcrypt';

import type { UserEntity } from '../entities/user.entity';
import { Repository, type UpdateResult } from 'typeorm';
import type { UserEmailDTO } from '../dto/user-email.dto';
import type { CreateUserResponseDto } from '../dto/create-user-response.dto';
import type { IAuthUser } from '../../auth/decorators/auth.decorator';
import type { UserPasswordDTO } from '../dto/user-password.dto';

@Injectable()
export class UserServiceImpl extends UserService {

  constructor(
    @Inject(UserRepository)
    private readonly _usersRepository: Repository<UserEntity>,
  ) {
    super();
  }

  public override async findUser(
    userDto: UserEmailDTO,
  ): Promise<UserEntity | null> {
    const email = userDto.email;
    const user = await this._usersRepository.findOneBy({ email });
    return user;
  }

  public override async createUser(
    userDto: CreateUserResponseDto,
  ): Promise<UserEntity> {
    const { email, password, role } = userDto;
    const checkUser = await this.findUser(userDto);
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

}
