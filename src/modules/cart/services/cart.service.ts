import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { Repository } from 'typeorm';
import { CartRepository } from '../repositories/cart.repository';
import { CartService } from './cart.service.abstract';
import { ProductService } from '../../product/services/product.service.abstract';

import type { CartEntity } from '../entities/cart.entity';
import type { IAuthUser } from '../../../@framework/decorators/auth.decorator';
import type { CartDTO } from '../dto/cart.dto';
import type { DeleteResult , UpdateResult } from 'typeorm';
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

  public override async getCart(user: IAuthUser): Promise<CartDTO[]> {
    const cart = this._cartRepository.findBy({ userId: user.id });
    if(!cart) { throw new NotFoundException(); }
    return cart;
  }

  public override async deleteCart(user: IAuthUser): Promise<DeleteResult> {
    return this._cartRepository.delete({ userId : user.id } );
  }

  public override async hasProduct (productId: number, user: IAuthUser): Promise<boolean> {
    const carts = await this.getCart(user);
    if(!carts) { return false; }
    return carts.some(function(el) {
      return el.productId === productId;
    });
  }

  public override async addItemToCart(
    productId: ProductDTO,
    user: IAuthUser,
    quantity: number,
  ): Promise<UpdateResult | null> {
    const product = await this._productService.getProduct(productId.id);
    if (product) {
      const isProduct = await this.hasProduct(productId.id, user);
      if (isProduct) {
        const cart = await this.getCart(user);
        const quantity = cart[0]!.quantity += 1;
        const total = cart[0]!.total * quantity;
        return await this._cartRepository.update(cart[0]!.id, { quantity, total });

      }
      const newItem = this._cartRepository.create();
      newItem.productId = productId.id;
      newItem.userId = user.id;
      newItem.total = productId.price * quantity;
      await this._cartRepository.save(newItem);
    }
    return null;
  }

  public override async getItemsInCard(user: IAuthUser): Promise<CartEntity[]> {
    const userCart = await this._cartRepository.find({ relations: ['product','user'] });
    return (await userCart).filter(item => item.user.id === user.id);
  }

}
