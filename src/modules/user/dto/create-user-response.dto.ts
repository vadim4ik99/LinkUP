import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsEnum, IsNotEmpty, IsOptional, IsString } from 'class-validator';
import { UserTypeEnum } from '../entities/user.entity';

export class CreateUserResponseDto {

  @ApiProperty()
  @IsEmail()
  @IsNotEmpty()
  public email!: string;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  public password!: string;

  @ApiProperty({ enum: ['vendor', 'customer'] })
  @IsOptional()
  @IsEnum(UserTypeEnum)
  public role?: UserTypeEnum;

}
