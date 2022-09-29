import { ProductEntity } from '../entities/product.entity';

import type { BySortEnum } from 'src/@framework/bysort.enum';
import type { DataSource } from 'typeorm';
import type { IProductRepository } from '../../product/interfaces/product.repository.interface';

export const ProductRepository = Symbol('PRODUCT_REPOSITORY');

export const productRepositoryFactory = (
  dataSource: DataSource,
): IProductRepository =>
  dataSource.getRepository(ProductEntity).extend<IProductRepository>({

    async getAllProducts(
      sort: BySortEnum,
      page: number,
      take: number,
      categoryIds: number[],
    ): Promise<ProductEntity[]> { //must be Promise<[ProductEntity[], number]> to also get general count
      const hasCategories = categoryIds.length > 0;

      const builder = this.createQueryBuilder('product');
      const result = await builder.leftJoin('categoryProducts', 'cp')
        .where(hasCategories ? 'cp.id = any(:categoryIds)' : '', categoryIds)
        .orderBy('createdAt', sort)
        .skip((page - 1) * take)
        .take(take)
        .getMany();

      return result;
    },
  } as IProductRepository);

