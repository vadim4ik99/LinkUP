import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CartRepository } from '../repositories/cart.repositories';

@Injectable()
export class CartService {

  constructor(
        @InjectRepository(CartRepository)
        private cartRepository: CartRepository,
  ) {}

}
