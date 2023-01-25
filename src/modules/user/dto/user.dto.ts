import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsInt, IsNotEmpty, IsString } from 'class-validator';

export class UserDTO {

  @ApiProperty()
  @IsInt()
  @IsNotEmpty()
  public id!: number;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  public firstName!: string;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  public lastName!: string;

  @ApiProperty()
  @IsEmail()
  @IsNotEmpty()
  public email!: string;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  public password!: string;

  @ApiProperty()
  @IsInt()
  public avatar!: number;

}
