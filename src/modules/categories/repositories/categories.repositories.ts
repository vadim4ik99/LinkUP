import { Repository, EntityRepository } from 'typeorm';
import { CategoriesEntity } from '../entities/categories.entity';

@EntityRepository(CategoriesEntity)
export class CategoriesRepository extends Repository<CategoriesEntity> {}
