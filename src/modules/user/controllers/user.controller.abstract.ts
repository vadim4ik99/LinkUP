import type { IAuthUser } from 'src/@framework/decorators/auth.decorator';
import type { UpdateResult } from 'typeorm';
import type { ImageNameDTO } from '../dto/user-avatar.dto ';
import type { UserProfileDTO } from '../dto/user-profile.dto';
import type { UserEntity } from '../entities/user.entity';

export abstract class UserControllerAbs {

  public abstract editProfile(userDto: UserProfileDTO): Promise<UpdateResult>;

  public abstract updateAvatar(user: IAuthUser, userAvatar:ImageNameDTO): Promise<UpdateResult>;

  public abstract getUserInfo(user: IAuthUser): Promise<UserEntity | null>;

}
