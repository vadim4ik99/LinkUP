import type { DataSource, Repository } from 'typeorm';
import { CartEntity } from '../entities/cart.entity';

export const CartRepository = Symbol('CART_REPOSITORY');

export const cartRepositoryFactory = (
  dataSource: DataSource,
): Repository<CartEntity> => dataSource.getRepository(CartEntity).extend({});
