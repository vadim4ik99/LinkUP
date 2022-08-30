import type { UpdateResult } from 'typeorm';
import type { UserDTO } from '../dto/user.dto';
import type { UserEntity } from '../entities/user.entity';

export abstract class UserService {

  public abstract findUser(userDto: Pick <UserDTO, 'email'>): Promise<UserEntity | null>;

  public abstract createUser(userDto: UserDTO): Promise<UserEntity>;

  public abstract activateUser(email: string): Promise<UpdateResult>;

  public abstract updateUserPassword(email: string, password: string): Promise<UpdateResult>;

}
