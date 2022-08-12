import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { OrderRepository } from '../repositories/order.repositories';

@Injectable()
export class OrderService {

  constructor(
        @InjectRepository(OrderRepository)
        private orderRepository: OrderRepository,
  ) {}

}
