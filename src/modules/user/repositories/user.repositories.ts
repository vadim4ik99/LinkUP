import { Repository } from 'typeorm';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UserEntity } from '../entities/user.entity';

@Injectable()
export class UserRepository {

  constructor(@InjectRepository(UserEntity) private userRepo: Repository<UserEntity>) { }

  public async findByEmail(email: string): Promise<UserEntity|null> {
    return this.userRepo.findOneBy({ email });
  }

}
