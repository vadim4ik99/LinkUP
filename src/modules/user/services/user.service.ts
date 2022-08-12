import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UserRepository } from '../repositories/user.repositories';

@Injectable()
export class UserService {

  constructor(
        @InjectRepository(UserRepository)
        private userRepository: UserRepository,
  ) {}

}
