import type { UserEntity } from 'src/modules/user/entities/user.entity';

export abstract class AuthService {

    public abstract validateUser(email: string, pass: string): Promise<UserEntity>;

    public abstract login(email: string): Promise<unknown>;

}
