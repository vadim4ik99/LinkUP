import { ProductEntity } from '../entities/product.entity';

import type { BySortEnum } from 'src/@framework/bysort.enum';
import type { DataSource, Repository } from 'typeorm';

export const ProductRepository = Symbol('PRODUCT_REPOSITORY');

export const productRepositoryFactory = (
  dataSource: DataSource,
): Repository<ProductEntity> =>
  dataSource.getRepository(ProductEntity).extend({
    getAllProducts(
      sort: BySortEnum,
      page: number,
      take: number,
      categoryIds?: number[],
    ): Promise <ProductEntity[]> {
      const builder = this.createQueryBuilder('product');
      const result = builder.leftJoin('categoryProducts', 'cp');
      if(!categoryIds) {
        return result.orderBy('createdAt', sort)
          .skip((page - 1) * take)
          .take(take)
          .getMany();
      }
      return result.where('cp.id = any(:categoryIds)', categoryIds)
        .orderBy('createdAt', sort)
        .skip((page - 1) * take)
        .take(take)
        .getMany();
    },
  });
