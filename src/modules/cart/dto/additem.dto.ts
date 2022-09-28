import { IsInt } from 'class-validator';

export class AddItemToCartDTO {

  @IsInt()
  public productId!: number;

  @IsInt()
  public quantity!: number;

}
