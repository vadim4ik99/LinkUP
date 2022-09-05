import type { IAuthUser } from '../auth.decorator';
import type { UserPasswordDTO } from '../../user/dto/user-password.dto';
import type { CreateUserResponseDto } from '../../user/dto/create-user-response.dto';
import type { UserEmailDTO } from '../../user/dto/user-email.dto';
import type { UpdateResult } from 'typeorm';
import type { UserEntity } from '../../user/entities/user.entity';

export abstract class AuthController {

  public abstract signUp(userDto: CreateUserResponseDto): Promise<boolean>

  public abstract verifyEmail(token: string): Promise<boolean>;

  public abstract signIn(userDto: CreateUserResponseDto): Promise<UserEntity>;

  public abstract forgotPassword(userDto: UserEmailDTO): Promise<void>;

  public abstract resetPassword(user: IAuthUser, payload: UserPasswordDTO): Promise<UpdateResult>;

}
