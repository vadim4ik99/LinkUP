import type { EmailTamplate } from 'src/modules/mail/services/mail.service';
import type { UserDTO } from 'src/modules/user/dto/user.dto';
import type { UserEntity } from 'src/modules/user/entities/user.entity';
import type { UpdateResult } from 'typeorm/query-builder/result/UpdateResult';
import type { AuthUser } from '../auth.decorator';

export abstract class AuthService {

    public abstract singIn(userDto: Pick<UserDTO, 'email' | 'password'>): Promise<UserEntity>;

    public abstract singUp(userDto: Pick<UserDTO, 'email' | 'password'>): Promise<boolean>;

    public abstract sendEmailTemplate (user: Pick<UserDTO,'email'>, tamplate: EmailTamplate): Promise<void>;

    public abstract verifyEmail (token: string): Promise<boolean>;

    public abstract forgotPassword (userDto: Pick<UserDTO, 'email'>): Promise<void>;

    public abstract resetPassword (user: AuthUser, password: Pick<UserDTO, 'password'>): Promise<UpdateResult>

    public abstract loginJwt (userDto: Pick<UserDTO, 'password' | 'email'>): Promise<unknown>

}
