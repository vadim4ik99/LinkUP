import { Inject, Injectable, UnauthorizedException } from '@nestjs/common';
import { Repository } from 'typeorm';
import { OrderRepository } from '../repositories/order.repositories';
import { OrderService } from './order.service.abstract';
import { CartService } from '../../cart/services/cart.service.abstract';
import { UserService } from '../../user/services/user.service.abstract';

import type { OrderEntity } from '../entities/order.entity';
import type { IAuthUser } from '../../../@framework/decorators/auth.decorator';
import type { OrderDTO } from '../dto/order.dto';

@Injectable()
export class OrderServiceImpl extends OrderService {

  constructor(
    @Inject(OrderRepository)
    private readonly _orderRepository: Repository<OrderEntity>,
    private readonly _cartService: CartService,
    private readonly _userService: UserService,
  ) {
    super();
  }
  public async order(user: IAuthUser): Promise<OrderDTO> {

    const cartItems = await this._cartService.getItemsInCard(user);
    const authUser = await this._userService.findUser(user.email);
    if(!authUser) { throw new UnauthorizedException(); }
    const newOrder = await this._orderRepository.create();
    newOrder = user;
    return await this._orderRepository.save(newOrder);

  }

}
