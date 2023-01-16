import type { BySortEnum } from 'src/@framework/bysort.enum';
import type { Repository } from 'typeorm';
import type { ProductDTO } from '../dto/product.dto';
import type { ProductEntity } from '../entities/product.entity';

export interface IProductRepository extends Repository<ProductEntity> {

  getAllProducts(
    sort: BySortEnum,
    page: number,
    take: number,
    categoryIds?: string,
  ): Promise<[ProductDTO[], number]> ;

}
