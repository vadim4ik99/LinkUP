import { Exclude, Expose } from 'class-transformer';
import { UserTypeEnum } from '../entities/user.entity';

@Exclude()
export class UserLoginDto {

  @Expose()
  public firstName?: string;

  @Expose()
  public lastName?: string;

  @Expose()
  public email!: string;

  @Expose()
  public role!: UserTypeEnum;

}
