import type { DataSource, Repository } from 'typeorm';
import { ProductEntity } from '../entities/product.entity';

export const ProductRepository = Symbol('PRODUCT_REPOSITORY');

export const productRepositoryFactory = (
  dataSource: DataSource,
): Repository<ProductEntity> =>
  dataSource.getRepository(ProductEntity).extend({});
