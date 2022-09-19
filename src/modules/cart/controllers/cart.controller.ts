import { Controller, Delete, Get, Post } from '@nestjs/common';
import { ProductDTO } from 'src/modules/product/dto/product.dto';
import { CartService } from '../services/cart.service.abstract';
import { CartControllerAbs } from './cart.controller.abstract';
import { AuthUser, IAuthUser } from '../../../@framework/decorators/auth.decorator';

import type { CartDTO } from '../dto/cart.dto';
import type { DeleteResult, UpdateResult } from 'typeorm';

@Controller('cart')
export class CartController extends CartControllerAbs {

  constructor(private readonly _cartService: CartService) {
    super();
  }

  @Post('/')
  public override async addItemToCart(
    productId: ProductDTO,
    @AuthUser() user: IAuthUser,
    quantity: number,
  ): Promise<UpdateResult | null> {
    return await this._cartService.addItemToCart(productId, user, quantity);
  }

  @Delete('/')
  public override async deleteCart(@AuthUser() user: IAuthUser): Promise<DeleteResult> {
    return await this._cartService.deleteCart(user);
  }

  @Get('/')
  public override async getCart(@AuthUser() user: IAuthUser): Promise<CartDTO[]> {
    return await this._cartService.getCart(user);
  }

}

