import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserController } from './controllers/user.controller';
import { UserEntity } from './entities/user.entity';
import { UserRepository, userRepositoryFactory } from './repositories/user.repository';
import { UserServiceImpl } from './services/user.service';
import { UserService } from './services/user.service.abstract';

const userRepository = {
  provide: UserRepository,
  inject: ['DATA_SOURCE'],
  useFactory: userRepositoryFactory,
};

const userService = { provide: UserService, useClass: UserServiceImpl };

@Module({
  imports: [TypeOrmModule.forFeature([UserEntity])],
  controllers: [UserController],
  providers: [
    userService,
    userRepository,
  ],
  exports: [userService],
})
export class UserModule {}
