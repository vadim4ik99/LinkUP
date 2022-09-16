import { IsInt, IsNotEmpty } from 'class-validator';

export class CartDTO {

  @IsInt()
  @IsNotEmpty()
  public id!: number;

  @IsInt()
  public userId!: number;

  @IsInt()
  public productId!: number;

}
