import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsInt, IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class ProductUpdateDto {

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  public title!: string;

  @ApiProperty()
  @IsInt()
  @IsNotEmpty()
  public price!: number;

  @ApiProperty()
  @IsString()
  public descriptionSmall!: string;

  @ApiProperty()
  @IsString()
  public descriptionFull!: string;

  @ApiPropertyOptional()
  @IsInt()
  @IsOptional()
  public sold?: number;

  @ApiProperty()
  @IsInt()
  @IsNotEmpty()
  public quantity!: number;

  @ApiProperty()
  @IsString({ each: true })
  public categoryIds!: string[];

  @ApiPropertyOptional()
  @IsInt()
  @IsOptional()
  public imgId?: number;

}
