import { IsInt, IsNotEmpty, IsOptional, IsString } from 'class-validator';

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

  @IsString({each: true})
  public categoryIds!: string[];

  @IsOptional()
  @IsInt()
  public imgId?: number;

}
