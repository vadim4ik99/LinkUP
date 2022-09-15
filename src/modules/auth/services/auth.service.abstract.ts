import type { EmailTamplate } from '../../mail/services/mail.service';
import type { CreateUserResponseDto } from '../../user/dto/create-user-response.dto';
import type { UserDTO } from '../../user/dto/user.dto';
import type { UpdateResult } from 'typeorm/query-builder/result/UpdateResult';
import type { IAuthUser } from '../../../@framework/decorators/auth.decorator';
import type { UserEmailDTO } from '../../user/dto/user-email.dto';
import type { UserPasswordDTO } from '../../user/dto/user-password.dto';
import type { UserLoginDto } from 'src/modules/user/dto/user-login.dto';

export abstract class AuthService {

  public abstract singIn(
    userDto: CreateUserResponseDto,
  ): Promise<UserLoginDto>;

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
    user: IAuthUser,
    password: UserPasswordDTO,
  ): Promise<UpdateResult>;

  public abstract loginJwt(
    userDto: Pick<UserDTO, 'password' | 'email'>,
  ): Promise<unknown>;

  public abstract  logOut(
    user: IAuthUser
  ):  Promise<boolean>;

}
