import type { OrderStatus } from '../entities/order.entity';

export class OrderDTO {

  public id: number;
  public name: string;
  //public img: number[];
  public status: OrderStatus;

  constructor(name: string, id: number, status: OrderStatus) {
    this.name = name;
    this.id =  id;
    this.status = status;
  }

}

