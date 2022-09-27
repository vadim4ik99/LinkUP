import { IsInt, IsNotEmpty, IsString } from 'class-validator';
import type { CategoriesEntity } from '../entities/categories.entity';

export class CategoriesInputDTO {

  @IsInt()
  @IsNotEmpty()
  public id!: number;

  @IsString()
  @IsNotEmpty()
  public name!: string;

  @IsInt()
  public imgId?: number;

}
export class CategoriesOutputDTO {

  constructor(entity: CategoriesEntity) {
    this.id = entity.id;
    this.name = entity.name;
  }
  public id!: number;

  public name!: string;

  public imgId?: number;

}

export class CategoriesUpdateDTO {

  @IsString()
  @IsNotEmpty()
  public name!: string;

  @IsInt()
  public imgId!: number;

}
