import { Injectable, NotImplementedException } from '@nestjs/common';
import { UserService } from './user.service.abstract';
import type { CreateUserResponseDto } from '../dto/create-user-response.dto';

//import { InjectRepository } from '@nestjs/typeorm';
//import { UserRepository } from '../repositories/user.repositories';
/*
  constructor(
    @InjectRepository(UserRepository)
     private userRepository: UserRepository,
  ) {}
*/

@Injectable()
export class UserServiceImpl extends UserService {

  public override create(_email: string): Promise<CreateUserResponseDto> {
    throw new NotImplementedException();
  }

}
