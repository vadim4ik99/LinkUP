import { Inject, Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { CartRepository } from '../repositories/cart.repository';
import { CartService } from './cart.service.abstract';
import { ProductService } from '../../product/services/product.service.abstract';
import { UserService } from '../../user/services/user.service.abstract';

import type { CartEntity } from '../entities/cart.entity';

@Injectable()
export class CartServiceImpl extends CartService {

  constructor(
    @Inject(CartRepository)
    private readonly _cartRepository: Repository<CartEntity>,
    private readonly _userService: UserService,
    private readonly _productService: ProductService,
  ) {
    super();
  }
  /*public override async addToCart(productId: number, quantity: number, user: string): Promise<void> {
    const cartItems = await this._cartRepository.find({ relations: ['product','user'] });
    const product = await this._productService.getProduct(productId);
    const authUser = await this._userService.findUser(user);

  }
  */

}
