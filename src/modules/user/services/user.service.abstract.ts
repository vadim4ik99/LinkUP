import type { IAuthUser } from 'src/modules/auth/auth.decorator';
import type { UpdateResult } from 'typeorm';
import type { CreateUserResponseDto } from '../dto/create-user-response.dto';
import type { UserEmailDTO } from '../dto/user-email.dto';
import type { UserPasswordDTO } from '../dto/user-password.dto';
import type { UserEntity } from '../entities/user.entity';

export abstract class UserService {

  public abstract findUser(userDto: UserEmailDTO): Promise<UserEntity | null>;

  public abstract createUser(
    userDto: CreateUserResponseDto,
  ): Promise<UserEntity>;

  public abstract activateUser(userDto: UserEmailDTO): Promise<UpdateResult>;

  public abstract updateUserPassword(
    user: IAuthUser,
    userDto: UserPasswordDTO,
  ): Promise<UpdateResult>;

}
