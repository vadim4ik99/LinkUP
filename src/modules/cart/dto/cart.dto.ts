import { IsInt, IsNotEmpty } from 'class-validator';

export class CartDTO {

  @IsInt()
  @IsNotEmpty()
  public id!: number;

  @IsInt()
  public userId!: number;

  @IsInt()
  public productId!: number;

  @IsInt()
  public quantity!: number;

  @IsInt()
  public total!: number;

}

export class CartUpdateProductDTO {

  @IsInt()
  public quantity!: number;

  @IsInt()
  public total!: number;

}
