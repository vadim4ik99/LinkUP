import { BadRequestException, Inject, Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { UserRepository } from '../repositories/user.repository';
import { UserService } from './user.service.abstract';
import { genSalt, hash } from 'bcrypt';

import type { UserEntity } from '../entities/user.entity';
import type { UpdateResult } from 'typeorm';
import type { UserEmailDTO } from '../dto/user-email.dto';
import type { CreateUserResponseDto } from '../dto/create-user-response.dto';
import type { AuthUser } from 'src/modules/auth/auth.decorator';
import type { UserPasswordDTO } from '../dto/user-email.dto copy';

@Injectable()
export class UserServiceImpl extends UserService {

  constructor(
    @Inject(UserRepository)
    private readonly usersRepository: Repository<UserEntity>,
  ) {
    super();
  }

  public override async findUser(userDto: UserEmailDTO): Promise<UserEntity | null> {
    const email = userDto.email;
    return await this.usersRepository.findOneBy({ email });
  }

  public override async createUser(userDto: CreateUserResponseDto): Promise<UserEntity> {
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

  public override async activateUser(userDto: UserEmailDTO): Promise<UpdateResult> {
    const user = this.usersRepository.findOneBy({ email: userDto.email });
    if(user === null) { throw new Error('User is not found'); }
    return this.usersRepository.update({ email: userDto.email  }, { verify: true });
  }

  public override async updateUserPassword(user: AuthUser, userDto: UserPasswordDTO): Promise<UpdateResult> {
    const salt = await genSalt(10);
    const newPassword = await hash(userDto.password, salt);
    return this.usersRepository.update({ email: user.email }, { password: newPassword });
  }

}
