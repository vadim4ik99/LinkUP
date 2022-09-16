import type { UserDTO } from '../dto/user.dto';
import type { UserProfileDTO } from '../dto/user-profile.dto';

export abstract class UserControllerAbs {

    public abstract editProfile(userDto: UserProfileDTO): Promise<UserDTO>;

}
