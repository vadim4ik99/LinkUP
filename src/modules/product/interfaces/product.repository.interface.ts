import type { BySortEnum } from 'src/@framework/bysort.enum';
import type { Repository } from 'typeorm';
import type { ProductEntity } from '../entities/product.entity';

export interface IProductRepository extends Repository<ProductEntity> {

  getAllProducts(
    sort: BySortEnum,
    page: number,
    take: number,
    categoryIds: number[],
  ): Promise<ProductEntity[]>;

}
