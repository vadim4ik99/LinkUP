import { ApiProperty } from '@nestjs/swagger';
import { IsInt } from 'class-validator';

export class CartDTO {

  @ApiProperty()
  public id!: number;

  @ApiProperty()
  public userId!: number;

  @ApiProperty()
  public productId!: number;

  @ApiProperty()
  public quantity!: number;

  @ApiProperty()
  public total!: number;

}

export class CartUpdateProductDTO {

  @ApiProperty()
  @IsInt()
  public quantity!: number;

  @ApiProperty()
  @IsInt()
  public total!: number;

}
