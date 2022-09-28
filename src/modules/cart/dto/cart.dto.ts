import { IsInt } from 'class-validator';

export class CartDTO {

  public id!: number;

  public userId!: number;

  public productId!: number;

  public quantity!: number;

  public total!: number;

}

export class CartUpdateProductDTO {

  @IsInt()
  public quantity!: number;

  @IsInt()
  public total!: number;

}
