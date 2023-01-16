import { IsNotEmpty, IsString } from 'class-validator';

export class CategoriesImageDTO {

  @IsString()
  @IsNotEmpty()
  public categoryIds!: string;

  @IsString()
  @IsNotEmpty()
  public filename!: string;

}
