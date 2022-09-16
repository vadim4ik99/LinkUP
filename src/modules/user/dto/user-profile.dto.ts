import { IsInt, IsNotEmpty, IsString } from 'class-validator';

export class UserProfileDTO {

  @IsString()
  @IsNotEmpty()
  public firstName!: string;

  @IsString()
  @IsNotEmpty()
  public lastName!: string;

  @IsInt()
  public avatar!: number;

}
