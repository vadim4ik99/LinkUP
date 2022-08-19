import { IsInt, IsNotEmpty } from 'class-validator';

export class CategoryProductDTO {

  @IsInt()
  @IsNotEmpty()
  public id!: number;

  @IsInt()
  public categoryId!: number;

  @IsInt()
  public productId!: number;

}
