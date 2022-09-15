export abstract class CartService {

    public abstract addToCart(productId: number, quantity: number, user: string): Promise<void>;

}
