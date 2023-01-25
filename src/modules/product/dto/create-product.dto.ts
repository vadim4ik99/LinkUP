import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsInt, IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class CreateProductDTO {

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

  @ApiProperty()
  @IsInt()
  @IsNotEmpty()
  public quantity!: number;

  @ApiProperty({ type: [String] })
  @IsString({ each: true })
  public categoryIds!: string[];

  @ApiPropertyOptional()
  @IsOptional()
  @IsInt()
  public imgId?: number;

}
