import { IsInt, IsNotEmpty, IsString } from 'class-validator';

export class UserProfileDTO {

  @IsInt()
  @IsNotEmpty()
  public id!: number;

  @IsString()
  @IsNotEmpty()
  public firstName!: string;

  @IsString()
  @IsNotEmpty()
  public lastName!: string;

  @IsInt()
  public avatar!: number;

}
