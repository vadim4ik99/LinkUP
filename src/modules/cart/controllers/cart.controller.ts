import { Controller, Delete, Get, Post } from '@nestjs/common';
import { ProductDTO } from 'src/modules/product/dto/product.dto';
import { CartService } from '../services/cart.service.abstract';
import { CartControllerAbs } from './cart.controller.abstract';
import { IAuthUser } from '../../../@framework/decorators/auth.decorator';

import type { CartDTO } from '../dto/cart.dto';

@Controller('cart')
export class CartController extends CartControllerAbs {

  constructor(private readonly _cartService: CartService) {
    super();
  }

    @Post('/')
  public override async addItemToCart(productId: ProductDTO, user: IAuthUser): Promise<CartDTO> {

  }

    @Delete('/')
    public override async removeItemFromCart(productId: string, user: IAuthUser): Promise<CartDTO> {

    }

    @Delete('/')
    public override async deleteCart(user: IAuthUser): Promise<void> {
      await this._cartService.deleteCart(user);
    }

    @Get('/')
    public override async getCart(user: IAuthUser): Promise<CartDTO> {
      return this._cartService.getCart(user);
    }

}

