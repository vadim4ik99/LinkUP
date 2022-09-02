import { IsInt, IsNotEmpty } from 'class-validator';

export class OrderProductDTO {

  @IsInt()
  @IsNotEmpty()
  public id!: number;

  @IsInt()
  public orderId!: number;

  @IsInt()
  public productId!: number;

  @IsInt()
  public cost!: number;

  @IsInt()
  public quantity!: number;

}
