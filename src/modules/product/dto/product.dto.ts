import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsInt, IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class ProductDTO {

  @ApiProperty()
  @IsInt()
  @IsNotEmpty()
  public id!: number;

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
  @IsOptional()
  @IsInt()
  public sold?: number;

  @ApiProperty()
  @IsInt()
  @IsNotEmpty()
  public quantity!: number;

  @ApiPropertyOptional()
  @IsOptional()
  @IsInt()
  public imgId?: number;

}
