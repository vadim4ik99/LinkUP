import { IsEmail, IsEnum, IsNotEmpty, IsOptional, IsString } from 'class-validator';
import { UserTypeEnum } from '../entities/user.entity';

export class CreateUserResponseDto {

  @IsEmail()
  @IsNotEmpty()
  public email!: string;

  @IsString()
  @IsNotEmpty()
  public password!: string;

  @IsOptional()
  @IsEnum(UserTypeEnum)
  public role?: UserTypeEnum;

}
