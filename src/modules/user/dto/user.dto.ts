import { IsEmail, IsInt, IsNotEmpty, IsString } from 'class-validator';

export class UserDTO {
  @IsInt()
  @IsNotEmpty()
  public id!: number;

  @IsString()
  @IsNotEmpty()
  public firstName!: string;

  @IsString()
  @IsNotEmpty()
  public lastName!: string;

  @IsEmail()
  @IsNotEmpty()
  public email!: string;

  @IsString()
  @IsNotEmpty()
  public password!: string;

  @IsInt()
  public avatar!: number;
}
