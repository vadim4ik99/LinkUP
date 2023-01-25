import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import type { CartEntity } from '../../../modules/cart/entities/cart.entity';

export class ProductOutDTO {

  @ApiProperty()
  public id!: number;

  @ApiProperty()
  public title!: string;

  @ApiProperty()
  public price!: number;

  @ApiProperty()
  public descriptionSmall!: string;

  @ApiProperty()
  public descriptionFull!: string;

  @ApiPropertyOptional()
  public sold?: number;

  @ApiProperty()
  public quantity!: number;

  @ApiPropertyOptional()
  public imgId?: number;

  @ApiProperty()
  public carts!: CartEntity[];

  public createdAt!: Date;

  public updatedAt!: Date;

}
