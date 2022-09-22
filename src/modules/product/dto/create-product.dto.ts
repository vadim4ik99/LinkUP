import { IsArray, IsInt, IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class CreateProductDTO {

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

  @IsInt()
  @IsNotEmpty()
  public quantity!: number;

  @IsArray()
  @IsString()
  public categoryIds!: string[];

  @IsOptional()
  @IsInt()
  public imgId?: number;

}
