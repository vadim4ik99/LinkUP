export class ProductDTO {

  private title: string;
  private price: number;
  private description_small: string;
  private description_full: string;
  private sold: number;
  private quantity: number;
  private categories: number[];
  private img: number[];

  constructor(title: string, price:number, description_small:string, description_full: string,
    sold: number, quantity: number, categories: number[], img:number[]) {
    this.title = title;
    this.price = price;
    this.description_small = description_small;
    this.description_full = description_full;
    this.sold = sold;
    this.quantity = quantity;
    this.categories = categories;
    this.img =  img;
  }

}
