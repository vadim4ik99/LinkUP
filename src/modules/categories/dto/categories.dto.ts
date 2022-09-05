import { IsInt, IsNotEmpty, IsString } from 'class-validator';

export class CategoriesDTO {

  @IsInt()
  @IsNotEmpty()
  public id!: number;

  @IsString()
  @IsNotEmpty()
  public name!: string;

  @IsInt()
  public imgId!: number;

}
