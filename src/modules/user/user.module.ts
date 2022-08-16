import { Module, type Provider } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserController } from './controllers/user.controller';
import { UserEntity } from './entities/user.entity';
import { UserService } from './services/user.service';
import { userRepositoryFactory, UserRepository } from './repositories/user.repository';

const userRepository: Provider<unknown> = {
  provide: UserRepository,
  inject: ['DATA_SOURCE'],
  useFactory: userRepositoryFactory,
};

@Module({
  imports: [TypeOrmModule.forFeature([UserEntity])],
  controllers: [UserController],
  providers: [UserService, userRepository],
})
export class UserModule {}
