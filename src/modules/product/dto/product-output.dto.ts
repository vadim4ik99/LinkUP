import type { CartEntity } from '../../../modules/cart/entities/cart.entity';

export class ProductOutDTO {

  public id!: number;

  public title!: string;

  public price!: number;

  public descriptionSmall!: string;

  public descriptionFull!: string;

  public sold?: number;

  public quantity!: number;

  public imgId?: number;

  public carts!: CartEntity[];

  public createdAt!: Date;

  public updatedAt!: Date;

}
