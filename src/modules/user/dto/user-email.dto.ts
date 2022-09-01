import { IsEmail, IsNotEmpty } from 'class-validator';

export class UserEmailDTO {
  @IsEmail()
  @IsNotEmpty()
  public email!: string;
}
