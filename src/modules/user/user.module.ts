import { Module, type Provider } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserController } from './controllers/user.controller';
import { UserEntity } from './entities/user.entity';
import { userRepositoryFactory, UserRepository } from './repositories/user.repository';
import { UserService } from './services/user.service.abstract';
import { UserServiceImpl } from './services/user.service';

const userRepository: Provider<unknown> = {
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
  exports: [
    userService,
  ],
})
export class UserModule {}
