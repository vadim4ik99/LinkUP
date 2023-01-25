import { ApiProperty } from '@nestjs/swagger';
import { IsInt, IsNotEmpty, IsString } from 'class-validator';

export class UserProfileDTO {

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
  @IsInt()
  public avatar!: number;

}
