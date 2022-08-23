import { BadRequestException, Inject, Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import type { UserDTO } from '../dto/user.dto';
import type { UserEntity } from '../entities/user.entity';
import { UserRepository } from '../repositories/user.repository';
import { UserService } from './user.service.abstract';
import { genSalt, hash } from 'bcrypt';

@Injectable()
export class UserServiceImpl extends UserService {

  constructor(
        @Inject(UserRepository)
        private readonly usersRepository: Repository<UserEntity>,
  ) {
    super();
  }

  public async findUser(email: string): Promise<UserEntity | null> {
    return await this.usersRepository.findOneBy({ email: email });
  }

  public async createUser(userDto: Pick <UserDTO, 'email' | 'password'>): Promise<UserEntity> {
    const checkUser = this.findUser(userDto.email);
    if(checkUser != null) {
      throw new BadRequestException('User already exist');
    }

    const salt = await genSalt(10);
    const newUser = {
      email: userDto.email,
      password: await hash(userDto.password, salt),
    };
    return await this.usersRepository.save(newUser);
  }

}
