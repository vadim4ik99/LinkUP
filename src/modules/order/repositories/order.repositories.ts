import type { DataSource, Repository } from 'typeorm';
import { OrderEntity } from '../entities/order.entity';

export const OrderRepository =  Symbol('PRODUCT_REPOSITORY');

export const orderRepositoryFactory = (dataSource: DataSource): Repository<OrderEntity> =>
  dataSource.getRepository(OrderEntity).extend({});
