import { Repository, EntityRepository } from 'typeorm';
import { OrderEntity } from '../entities/order.entity';

@EntityRepository(OrderEntity)
export class OrderRepository extends Repository<OrderEntity> {}
