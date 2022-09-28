import { Body, Controller, Delete, Get, Post, UseGuards } from '@nestjs/common';
import { CartService } from '../services/cart.service.abstract';
import { CartControllerAbs } from './cart.controller.abstract';
import { AuthUser, IAuthUser } from '../../../@framework/decorators/auth.decorator';
import { JwtGuard } from '../../../@framework/guard/jwt.guard';
import { AddItemToCartDTO } from '../dto/additem.dto';

import type { CartDTO } from '../dto/cart.dto';
import type { UpdateResult } from 'typeorm';

@Controller('cart')
export class CartController extends CartControllerAbs {

  constructor(private readonly _cartService: CartService) {
    super();
  }

  @UseGuards(JwtGuard)
  @Post()
  public override async addItemToCart(
    @Body() payload: AddItemToCartDTO,
    @AuthUser() user: IAuthUser,
  ): Promise<UpdateResult | CartDTO> {
    return await this._cartService.addItemToCart(payload.productId, user, payload.quantity);
  }

  @UseGuards(JwtGuard)
  @Delete('/')
  public override async deleteCart(@AuthUser() user: IAuthUser): Promise<void> {
    return this._cartService.deleteCart(user);
  }

  @UseGuards(JwtGuard)
  @Get('/')
  public override async getCart(@AuthUser() user: IAuthUser): Promise<CartDTO[]> {
    return await this._cartService.getCartsByUser(user);
  }

}

