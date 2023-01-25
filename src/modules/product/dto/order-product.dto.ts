import { ApiProperty } from '@nestjs/swagger';
import { IsInt, IsNotEmpty } from 'class-validator';

export class OrderProductDTO {

  @ApiProperty()
  @IsInt()
  @IsNotEmpty()
  public id!: number;

  @ApiProperty()
  @IsInt()
  public orderId!: number;

  @ApiProperty()
  @IsInt()
  public productId!: number;

  @ApiProperty()
  @IsInt()
  public cost!: number;

  @ApiProperty()
  @IsInt()
  public quantity!: number;

}
