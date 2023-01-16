/* eslint-disable no-console */
import { ProductEntity } from '../entities/product.entity';

import type { BySortEnum } from 'src/@framework/bysort.enum';
import type { DataSource } from 'typeorm';
import type { IProductRepository } from '../../product/interfaces/product.repository.interface';
import type { ProductDTO } from '../dto/product.dto';

export const ProductRepository = Symbol('PRODUCT_REPOSITORY');

export const productRepositoryFactory = (
  dataSource: DataSource,
): IProductRepository =>
  dataSource.getRepository(ProductEntity).extend<IProductRepository>({
    async getAllProducts(
      sort: BySortEnum,
      page: number,
      take: number,
      categoryIds: string,
    ): Promise<[ProductDTO[], number]> {
      const arrCategoryIds = categoryIds.split(',').map(Number);
      const hasCategories = arrCategoryIds.length > 0;
      const builder = this.createQueryBuilder('product');
      const result = await builder.leftJoin('product.categoryProducts', 'cp')
        .where(hasCategories ? 'cp.category IN (:...ids)' : '', { ids: arrCategoryIds })
        .orderBy('product.createdAt', sort)
        .skip((page - 1) * take)
        .take(take)
        .getMany();

      const qb = this.createQueryBuilder('product');
      const count = await qb.leftJoin('product.categoryProducts', 'cp')
        .where(hasCategories ? 'cp.category IN (:...ids)' : '', { ids: arrCategoryIds })
        .getCount();

      return [result, count];
    },
  } as IProductRepository);

