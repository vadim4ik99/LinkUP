import { RoleEnum } from '../../auth/role.enum';
import { Exclude, Expose } from 'class-transformer';

@Exclude()
export class UserLoginDto {

  @Expose()
  public firstName?: string;

  @Expose()
  public lastName?: string;

  @Expose()
  public email!: string;

  @Expose()
  public role!: RoleEnum;

}
