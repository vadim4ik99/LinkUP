import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString, MaxLength, MinLength } from 'class-validator';

export class UserPasswordDTO {

  @ApiProperty()
  @IsString()
  @MinLength(4)
  @MaxLength(20)
  @IsNotEmpty()
  public password!: string;

}
