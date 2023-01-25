import { ApiProperty } from '@nestjs/swagger';
import { Exclude, Expose } from 'class-transformer';
import { UserTypeEnum } from '../entities/user.entity';

@Exclude()
export class UserLoginDto {

  @ApiProperty()
  @Expose()
  public firstName?: string;

  @ApiProperty()
  @Expose()
  public lastName?: string;

  @ApiProperty()
  @Expose()
  public email!: string;

  @ApiProperty({ enum: ['vendor', 'customer'] })
  @Expose()
  public role!: UserTypeEnum;

}
