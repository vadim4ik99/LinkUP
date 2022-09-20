import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { Repository } from 'typeorm';
import { CartRepository } from '../repositories/cart.repository';
import { CartService } from './cart.service.abstract';
import { ProductService } from '../../product/services/product.service.abstract';

import type { CartEntity } from '../entities/cart.entity';
import type { IAuthUser } from '../../../@framework/decorators/auth.decorator';
import type { CartDTO, CartUpdateProductDTO } from '../dto/cart.dto';
import type { DeleteResult } from 'typeorm';
import type { ProductDTO } from '../../product/dto/product.dto';

@Injectable()
export class CartServiceImpl extends CartService {

  constructor(
    @Inject(CartRepository)
    private readonly _cartRepository: Repository<CartEntity>,
    private readonly _productService: ProductService,
  ) {
    super();
  }

  public override async getCartsByUser(user: IAuthUser): Promise<CartDTO[]> {
    const cart = this._cartRepository.findBy({ userId: user.id });
    if(!cart) { throw new NotFoundException(); }
    return cart;
  }

  public override async deleteCart(user: IAuthUser): Promise<DeleteResult> {
    return this._cartRepository.delete({ userId : user.id } );
  }

  public override async hasProduct (productId: number, user: IAuthUser): Promise<boolean> {
    const carts = await this.getCartsByUser(user);
    if(!carts) { return false; }
    return carts.some((el) => el.productId === productId);
  }

  public override async addItemToCart(
    productId: ProductDTO,
    user: IAuthUser,
    quantity: number,
  ): Promise<CartUpdateProductDTO> {
    const product = await this._productService.getProduct(productId.id);
    if (!product) { throw new  NotFoundException(); }

    const isProduct = await this.hasProduct(productId.id, user);
    if (isProduct) {
      const cart = await this.getCartsByUser(user);
      const quantity = cart[0]!.quantity += 1; // Forbidden non-null assertion.
      const total = cart[0]!.total * quantity; // Forbidden non-null assertion.
      return await this._cartRepository.update(
        { id: cart[0]!.id },
        { quantity, total },
      );
    }

    const newItem = this._cartRepository.create();
    newItem.productId = productId.id;
    newItem.userId = user.id;
    newItem.total = productId.price * quantity;
    return await this._cartRepository.save(newItem);
  }

}
