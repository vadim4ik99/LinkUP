import { IsInt, IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class ProductUpdateDto {

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
  @IsOptional()
  public sold?: number;

  @IsInt()
  @IsNotEmpty()
  public quantity!: number;

  @IsString({ each: true })
  public categoryIds!: string[];

  @IsInt()
  @IsOptional()
  public imgId?: number;

}
