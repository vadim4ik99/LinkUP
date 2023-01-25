import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsInt, IsNotEmpty, IsString } from 'class-validator';
import type { CategoriesEntity } from '../entities/categories.entity';

export class CategoriesInputDTO {

  @ApiProperty()
  @IsInt()
  @IsNotEmpty()
  public id!: number;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  public name!: string;

  @ApiPropertyOptional()
  @IsInt()
  public imgId?: number;

}
export class CategoriesOutputDTO {

  constructor(entity: CategoriesEntity) {
    this.id = entity.id;
    this.name = entity.name;
  }
  @ApiProperty()
  public id!: number;

  @ApiProperty()
  public name!: string;

  @ApiPropertyOptional()
  public imgId?: number;

}

export class CategoriesUpdateDTO {

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  public name!: string;

  @ApiProperty()
  @IsInt()
  public imgId!: number;

}
