import { IsInt, IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class ProductDTO {

  @IsInt()
  @IsNotEmpty()
  public id!: number;

  @IsString()
  @IsNotEmpty()
  public title!: string;

  @IsInt()
  @IsNotEmpty()
  public price!: number;

  @IsString()
  public descriptionSmall!: string;

  @IsString()
  public descriptionFull!: string;

  @IsOptional()
  @IsInt()
  public sold?: number;

  @IsInt()
  @IsNotEmpty()
  public quantity!: number;

  @IsOptional()
  @IsInt()
  public categoriesId?: number;

  @IsOptional()
  @IsInt()
  public imgId?: number;

}
