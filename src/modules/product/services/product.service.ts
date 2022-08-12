import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ProductRepository } from '../repositories/product.repositories';

@Injectable()
export class ProductService {

  constructor(
        @InjectRepository(ProductRepository)
        private productRepository: ProductRepository,
  ) {}

}
