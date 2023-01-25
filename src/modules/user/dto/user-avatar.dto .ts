import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class ImageNameDTO {

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  public filename!: string;

}
