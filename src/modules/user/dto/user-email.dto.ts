import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty } from 'class-validator';

export class UserEmailDTO {

  @ApiProperty()
  @IsEmail()
  @IsNotEmpty()
  public email!: string;

}
