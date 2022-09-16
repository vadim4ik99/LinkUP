import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { Repository } from 'typeorm';
import { CartRepository } from '../repositories/cart.repository';
import { CartService } from './cart.service.abstract';

import type { CartEntity } from '../entities/cart.entity';
import type { IAuthUser } from 'src/@framework/decorators/auth.decorator';
import type { CartDTO } from '../dto/cart.dto';
import type { DeleteResult } from 'typeorm';
import type { ProductDTO } from '../../product/dto/product.dto';

@Injectable()
export class CartServiceImpl extends CartService {

  constructor(
    @Inject(CartRepository)
    private readonly _cartRepository: Repository<CartEntity>,
  ) {
    super();
  }

  public override async getCart(user: IAuthUser): Promise<CartDTO> {
    const cart = this._cartRepository.findOneBy({ userId: user.id });
    if(cart === null) { throw new NotFoundException(); }
    return cart;
  }

  public override async deleteCart(user: IAuthUser): Promise<DeleteResult> {
    return this._cartRepository.delete({ userId : user.id } );
  }

  public override async addItemToCart(productId: ProductDTO, user: IAuthUser): Promise<CartDTO> {

    if
  }

}
