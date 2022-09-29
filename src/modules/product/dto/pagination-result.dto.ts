import type { ProductDTO } from './product.dto';

export class PaginationDTO {

  public data!: ProductDTO[];

  public total!: number;

  public corentPage!: number;

  public lastPage!: number;

}
