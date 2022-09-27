import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { Repository } from 'typeorm';
import { CartRepository } from '../repositories/cart.repository';
import { CartService } from './cart.service.abstract';
import { ProductService } from '../../product/services/product.service.abstract';

import type { CartEntity } from '../entities/cart.entity';
import type { IAuthUser } from '../../../@framework/decorators/auth.decorator';
import type { CartDTO } from '../dto/cart.dto';
import type { DeleteResult , UpdateResult } from 'typeorm';

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
    const cart = await this._cartRepository.find({
      where: { user: { id: user.id } }, relations: ['user'] });
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
    productId: number,
    user: IAuthUser,
    quantity: number,
  ): Promise<UpdateResult | CartDTO> {
    const product = await this._productService.getProduct(productId);
    if (!product) { throw new  NotFoundException(); }

    const isProduct = await this.hasProduct(productId, user);
    if (isProduct) {
      const cart = await this.getCartsByUser(user);
      const newQuantity = cart[0]!.quantity + quantity; // Forbidden non-null assertion.
      const newTotal = cart[0]!.total * quantity; // Forbidden non-null assertion.
      return this._cartRepository.update(
        { id: cart[0]!.id },
        { quantity: newQuantity, total:newTotal },
      );
    }
    const newItem = this._cartRepository.create();
    newItem.productId = product.id;
    newItem.userId = user.id;
    newItem.quantity = quantity;
    newItem.total = product.price * quantity;
    return this._cartRepository.save(newItem);
  }

  public override async getItemsInCard(user: IAuthUser): Promise<number[]> {
    const entity = await this._cartRepository.find({
      where: { user: { id: user.id } },
      relations: ['product','user'],
    });
    const productIds = entity.map(item => item.productId);
    return productIds;
  }

}
