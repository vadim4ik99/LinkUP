import { ApiProperty } from '@nestjs/swagger';
import type { ProductDTO } from './product.dto';

export class PaginationDTO {

  @ApiProperty()
  public data!: ProductDTO[];

  @ApiProperty()
  public total!: number;

  @ApiProperty()
  public page!: number;

  @ApiProperty()
  public lastPage!: number;

}
