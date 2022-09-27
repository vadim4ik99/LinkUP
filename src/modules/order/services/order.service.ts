import { Inject, Injectable, UnauthorizedException } from '@nestjs/common';
import { DataSource, Repository } from 'typeorm';
import { OrderRepository } from '../repositories/order.repositories';
import { OrderService } from './order.service.abstract';
import { CartService } from '../../cart/services/cart.service.abstract';
import { UserService } from '../../user/services/user.service.abstract';
import { OrderProductRepository } from '../../product/repositories/order-product.repository';
import { paginate } from 'nestjs-typeorm-paginate';

import type { OrderEntity, OrderStatus } from '../entities/order.entity';
import type { IAuthUser } from '../../../@framework/decorators/auth.decorator';
import type { OrderProductEntity } from '../../product/entities/order-product.entity';
import type { OrderDTO } from '../dto/order.dto';
import type { IPaginationOptions, Pagination } from 'nestjs-typeorm-paginate';
import type { UpdateResult } from 'typeorm';

@Injectable()
export class OrderServiceImpl extends OrderService {

  constructor(
    @Inject(OrderRepository)
    private readonly _orderRepository: Repository<OrderEntity>,
    @Inject(OrderProductRepository)
    private readonly _orderProductRepository: Repository<OrderProductEntity>,
    private readonly _cartService: CartService,
    private readonly _userService: UserService,
    private readonly _dataSource: DataSource,
  ) {
    super();
  }

  public override async order(user: IAuthUser): Promise<void> {
    const cartProductIds = await this._cartService.getItemsInCard(user);
    const authUser = await this._userService.findUser(user.email);
    if(!authUser) { throw new UnauthorizedException(); }
    await this._dataSource.transaction(async (manager) => {
      const newOrder = await manager.save(this._orderRepository.create({ user: authUser }));
      await manager.save(this._orderProductRepository.create(
        cartProductIds.map(productId => ( { order: newOrder , product: { id: productId } })),
      ));
    });
  }

  public override async getAllOrders(user: IAuthUser): Promise<OrderDTO[]> {
    return this._orderRepository.find({
      where: { user: { id: user.id } },
      relations: ['product','user'],
    });
  }

  public override async changeOrderStatus(orderId: number, status: OrderStatus): Promise<UpdateResult> {
    return this._orderRepository.update({ id : orderId },{ status });
  }

  public override async paginate(options: IPaginationOptions, user: IAuthUser): Promise<Pagination<OrderEntity>> {
    return paginate<OrderEntity>(this._orderRepository, options, {
      userId: user.id,
    });
  }

}
