import { IsNotEmpty, IsString, MaxLength, MinLength } from 'class-validator';

export class UserPasswordDTO {

  @IsString()
  @MinLength(4)
  @MaxLength(20)
  @IsNotEmpty()
  public password!: string;

}

