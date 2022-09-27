import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { Repository } from 'typeorm';
import { CartRepository } from '../repositories/cart.repository';
import { CartService } from './cart.service.abstract';
import { ProductService } from '../../product/services/product.service.abstract';
import { UserService } from '../../../modules/user/services/user.service.abstract';

import type { CartEntity } from '../entities/cart.entity';
import type { IAuthUser } from '../../../@framework/decorators/auth.decorator';
import type { CartDTO } from '../dto/cart.dto';
import type { UpdateResult } from 'typeorm';

@Injectable()
export class CartServiceImpl extends CartService {

  constructor(
    @Inject(CartRepository)
    private readonly _cartRepository: Repository<CartEntity>,
    private readonly _productService: ProductService,
    private readonly _userService: UserService
  ) {
    super();
  }

  public override async getCartsByUser(user: IAuthUser): Promise<CartDTO[]> {
    const cart = await this._cartRepository.find({
      where: { user: { id: user.id } }, relations: ['user'] });
    if(!cart) { throw new NotFoundException(); }
    return cart;
  }

  public override async deleteCart(user: IAuthUser): Promise<CartDTO[]> {
    const carts = await this._cartRepository.find({
      where: { user: { id: user.id } }, relations: ['user']
    })
    return this._cartRepository.remove(carts);
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
      const cart = await this._cartRepository.find({
        where: { product: { id: productId} },
        relations: ['product'],
      });
      const newQuantity = cart[0]!.quantity + quantity; 
      const newTotal = cart[0]!.total * quantity;
      return this._cartRepository.update(
        { id: cart[0]!.id },
        { quantity: newQuantity, total:newTotal },
      );
    }
    const userEntity = await this._userService.findUser(user.email);
    if (!userEntity) { throw new  NotFoundException(); }
    const newItem = this._cartRepository.create();
    newItem.product = product;
    newItem.user = userEntity;
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
