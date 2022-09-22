import type { UpdateResult } from 'typeorm';
import type { UserProfileDTO } from '../dto/user-profile.dto';

export abstract class UserControllerAbs {

    public abstract editProfile(userDto: UserProfileDTO): Promise<UpdateResult>;

}
