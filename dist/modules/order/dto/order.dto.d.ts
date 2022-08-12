import type { OrderStatus } from '../entities/order.entity';
export declare class OrderDTO {
    private name;
    private img;
    private status;
    constructor(name: string, img: number[], status: OrderStatus);
}
