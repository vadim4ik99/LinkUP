import { IsEmail, IsNotEmpty, IsString } from 'class-validator';
import type { UserTypeEnum } from '../entities/user.entity';

export class CreateUserResponseDto {

  @IsEmail()
  @IsNotEmpty()
  public email!: string;

  @IsString()
  @IsNotEmpty()
  public password!: string;

  //@isEnum(UserTypeEnum) ---> Why it`s not work
  public role!: UserTypeEnum;

}
