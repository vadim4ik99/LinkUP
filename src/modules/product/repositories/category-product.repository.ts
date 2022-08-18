import type { DataSource, Repository } from 'typeorm';
import { CategoryProductEntity } from '../entities/category-product.entity';

export const CategoryProductRepository =  Symbol('CATEGORY_PRODUCT_REPOSITORY');

export const categoryProductRepositoryFactory = (dataSource: DataSource): Repository<CategoryProductEntity> =>
  dataSource.getRepository(CategoryProductEntity).extend({});
