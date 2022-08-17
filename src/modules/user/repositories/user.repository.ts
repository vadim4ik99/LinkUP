import type { DataSource, Repository } from 'typeorm';
import { UserEntity } from '../entities/user.entity';

export const UserRepository =  Symbol('USER_REPOSITORY');

export const userRepositoryFactory = (dataSource: DataSource): Repository<UserEntity> =>
  dataSource.getRepository(UserEntity).extend({});
