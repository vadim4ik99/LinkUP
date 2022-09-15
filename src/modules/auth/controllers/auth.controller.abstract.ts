import type { IAuthUser } from '../../../@framework/decorators/auth.decorator';
import type { UserPasswordDTO } from '../../user/dto/user-password.dto';
import type { CreateUserResponseDto } from '../../user/dto/create-user-response.dto';
import type { UserEmailDTO } from '../../user/dto/user-email.dto';
import type { UpdateResult } from 'typeorm';
import type { UserLoginDto } from 'src/modules/user/dto/user-login.dto';

export abstract class AuthControllerAbs {

  public abstract signUp(userDto: CreateUserResponseDto): Promise<boolean>

  public abstract verifyEmail(token: string): Promise<boolean>;

  public abstract signIn(userDto: CreateUserResponseDto): Promise<UserLoginDto>;

  public abstract forgotPassword(userDto: UserEmailDTO): Promise<void>;

  public abstract resetPassword(user: IAuthUser, payload: UserPasswordDTO): Promise<UpdateResult>;

  public abstract logOut(res: Response, user: IAuthUser): Promise<void>;

}
