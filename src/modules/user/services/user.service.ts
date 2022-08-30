import { BadRequestException, Inject, Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { UserRepository } from '../repositories/user.repository';
import { UserService } from './user.service.abstract';
import { genSalt, hash } from 'bcrypt';

import type { UserDTO } from '../dto/user.dto';
import type { UserEntity } from '../entities/user.entity';
import type { UpdateResult } from 'typeorm';

@Injectable()
export class UserServiceImpl extends UserService {

  constructor(
    @Inject(UserRepository)
    private readonly usersRepository: Repository<UserEntity>,
  ) {
    super();
  }

  public override async findUser(userDto: Pick <UserDTO, 'email'>): Promise<UserEntity | null> {
    const email = userDto.email;
    return await this.usersRepository.findOneBy({ email });
  }

  public override async createUser(userDto: Pick <UserDTO, 'email' | 'password'>): Promise<UserEntity> {
    const checkUser = this.findUser(userDto);
    if(checkUser != null) {
      throw new BadRequestException('User already exist');
    }
    const salt = await genSalt(10);
    const newUser = {
      email: userDto.email,
      password: await hash(userDto.password, salt),
    };
    return this.usersRepository.save(newUser);
  }

  public override async activateUser(email: string): Promise<UpdateResult> {
    const user = this.usersRepository.findOneBy({ email });
    if(user === null) { throw new Error('User is not found'); }
    return this.usersRepository.update({ email }, { verify: true });
  }

  public override async updateUserPassword(email: string, password: string): Promise<UpdateResult> {
    const salt = await genSalt(10);
    const newPassword = await hash(password, salt);
    return this.usersRepository.update({ email }, { password: newPassword });
  }

}
