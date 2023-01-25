import { ApiProperty } from '@nestjs/swagger';
import { IsInt } from 'class-validator';

export class AddItemToCartDTO {

  @ApiProperty()
  @IsInt()
  public productId!: number;

  @ApiProperty()
  @IsInt()
  public quantity!: number;

}
