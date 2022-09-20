import { Controller, Delete, Get, Post, UseGuards } from '@nestjs/common';
import { ProductDTO } from 'src/modules/product/dto/product.dto';
import { CartService } from '../services/cart.service.abstract';
import { CartControllerAbs } from './cart.controller.abstract';
import { AuthUser, IAuthUser } from '../../../@framework/decorators/auth.decorator';
import { JwtGuard } from '../../../@framework/guard/jwt.guard';

import type { CartDTO, CartUpdateProductDTO } from '../dto/cart.dto';
import type { DeleteResult } from 'typeorm';

@Controller('cart')
export class CartController extends CartControllerAbs {

  constructor(private readonly _cartService: CartService) {
    super();
  }

  @UseGuards(JwtGuard)
  @Post('/')
  public override async addItemToCart(
    productId: ProductDTO,
    @AuthUser() user: IAuthUser,
    quantity: number,
  ): Promise<CartUpdateProductDTO> {
    return await this._cartService.addItemToCart(productId, user, quantity);
  }

  @UseGuards(JwtGuard)
  @Delete('/')
  public override async deleteCart(@AuthUser() user: IAuthUser): Promise<DeleteResult> {
    return await this._cartService.deleteCart(user);
  }

  @UseGuards(JwtGuard)
  @Get('/')
  public override async getCart(@AuthUser() user: IAuthUser): Promise<CartDTO[]> {
    return await this._cartService.getCartsByUser(user);
  }

}

