import type { DataSource, Repository } from 'typeorm';
import { OrderProductEntity } from '../entities/order-product.entity';

export const OrderProductRepository =  Symbol('ORDER-PRODUCT_REPOSITORY');

export const orderProductRepositoryFactory = (dataSource: DataSource): Repository<OrderProductEntity> =>
  dataSource.getRepository(OrderProductEntity).extend({});
