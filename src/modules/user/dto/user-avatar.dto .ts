import { IsNotEmpty, IsString } from 'class-validator';

export class ImageNameDTO {

  @IsString()
  @IsNotEmpty()
  public filename!: string;

}
