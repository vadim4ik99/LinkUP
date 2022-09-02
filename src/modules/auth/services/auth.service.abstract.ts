import type { EmailTamplate } from '../../mail/services/mail.service';
import type { CreateUserResponseDto } from '../../user/dto/create-user-response.dto';
import type { UserDTO } from '../../user/dto/user.dto';
import type { UserEntity } from '../../user/entities/user.entity';
import type { UpdateResult } from 'typeorm/query-builder/result/UpdateResult';
import type { AuthUser } from '../auth.decorator';
import type { UserEmailDTO } from '../../user/dto/user-email.dto';
import type { UserPasswordDTO } from '../../user/dto/user-password.dto';

export abstract class AuthService {

  public abstract singIn(
    userDto: CreateUserResponseDto,
  ): Promise<UserEntity>;

  public abstract singUp(
    userDto: CreateUserResponseDto,
  ): Promise<boolean>;

  public abstract sendEmailTemplate(
    user: UserEmailDTO,
    tamplate: EmailTamplate,
  ): Promise<void>;

  public abstract verifyEmail(token: string): Promise<boolean>;

  public abstract forgotPassword(
    userDto: UserEmailDTO,
  ): Promise<void>;

  public abstract resetPassword(
    user: AuthUser,
    password: UserPasswordDTO,
  ): Promise<UpdateResult>;

  public abstract loginJwt(
    userDto: Pick<UserDTO, 'password' | 'email'>,
  ): Promise<unknown>;

}
