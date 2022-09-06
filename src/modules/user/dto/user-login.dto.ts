import { Exclude, Expose } from 'class-transformer';
import { UserType } from '../../auth/decorators/authorization.decorator';

@Exclude()
export class UserLoginDto {

  @Expose()
  public firstName?: string;

  @Expose()
  public lastName?: string;

  @Expose()
  public email!: string;

  @Expose()
  public role!: UserType;

}
