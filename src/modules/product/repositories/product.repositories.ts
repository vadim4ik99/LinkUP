import { Repository, EntityRepository } from 'typeorm';
import { ProductEntity } from '../entities/product.entity';

@EntityRepository(ProductEntity)
export class ProductRepository extends Repository<ProductEntity> {}
