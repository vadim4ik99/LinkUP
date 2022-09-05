import type { DataSource, Repository } from 'typeorm';
import { CategoriesEntity } from '../entities/categories.entity';

export const CategoryRepository = Symbol('CATEGORY_REPOSITORY');

export const categoryRepositoryFactory = (
  dataSource: DataSource,
): Repository<CategoriesEntity> =>
  dataSource.getRepository(CategoriesEntity).extend({});
