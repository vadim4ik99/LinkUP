import type { UserDTO } from '../dto/user.dto';
import type { UserEntity } from '../entities/user.entity';

export abstract class UserService {

  public abstract findUser(email: string): Promise<UserEntity | null>;

  public abstract createUser(userDto: UserDTO): Promise<UserEntity>;

}
