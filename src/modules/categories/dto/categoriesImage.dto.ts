import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class CategoriesImageDTO {

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  public categoryIds!: string;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  public filename!: string;

}
