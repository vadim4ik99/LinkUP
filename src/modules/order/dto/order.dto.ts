import type { OrderStatus } from '../entities/order.entity';

export class OrderDTO {

  private name: string;
  private img: number[];
  private status: OrderStatus;

  constructor(name: string, img: number[], status: OrderStatus) {
    this.name = name;
    this.img =  img;
    this.status = status;
  }

}

