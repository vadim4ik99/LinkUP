import type { BySortEnum } from '../../../@framework/bysort.enum';
import type { ProductEntity } from '../entities/product.entity';

export interface IProductRepository {
  getAllProducts(
    sort: BySortEnum,
    page: number,
    take: number,
    categoryIds?: string[]
  ): Promise<ProductEntity[]>;
}
