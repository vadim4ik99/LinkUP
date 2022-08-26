import type { UserDTO } from 'src/modules/user/dto/user.dto';
import type { UserEntity } from 'src/modules/user/entities/user.entity';

export abstract class AuthService {

    public abstract validateUser(email: string, pass: string): Promise<UserEntity>;

    public abstract generateToken(email: string, expiresIn: string, id: number): Promise<string>

    //public abstract login(email: string): Promise<string>;

    public abstract singUp(userDto: Pick<UserDTO, 'email' | 'password'>): Promise<void>;

    public abstract sendWelcomeEmail (user: Pick<UserDTO,'email'>): Promise<void>;

}
