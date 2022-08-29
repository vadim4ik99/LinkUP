import type { EmailTamplate } from 'src/modules/mail/services/mail.service';
import type { UserDTO } from 'src/modules/user/dto/user.dto';
import type { UpdateResult } from 'typeorm/query-builder/result/UpdateResult';

export abstract class AuthService {

    public abstract singIn(email: string, password: string): Promise<string>;

    public abstract singUp(userDto: Pick<UserDTO, 'email' | 'password'>): Promise<boolean>;

    public abstract sendTamplateEmail (user: Pick<UserDTO,'email'>, tamplate: EmailTamplate): Promise<void>;

    public abstract verifyEmail (token: string): Promise<boolean>;

    public abstract forgotPassword (email: string): Promise<void>;

    public abstract resetPassword (token: string, password: string): Promise<UpdateResult>

}
