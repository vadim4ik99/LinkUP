import type { ProductDTO } from './product.dto';

export class PaginationDTO {

  public data!: ProductDTO[];

  public total!: number;

  public page!: number;

  public lastPage!: number;

}
