import { ApiProperty } from '@nestjs/swagger';
import { IsInt, IsNotEmpty } from 'class-validator';

export class CategoryProductDTO {

  @ApiProperty()
  @IsInt()
  @IsNotEmpty()
  public id!: number;

  @ApiProperty()
  @IsInt()
  public categoryId!: number;

  @ApiProperty()
  @IsInt()
  public productId!: number;

}
