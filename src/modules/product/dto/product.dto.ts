export class ProductDTO {

  public id: number;
  public title: string;
  public price: number;
  public descriptionSmall: string;
  public descriptionFull: string;
  public sold: number;
  public quantity: number;
  //public categories: number[];
  //public img: number[];

  constructor(id:number, title: string, price:number, descriptionSmall:string, descriptionFull: string,
    sold: number, quantity: number) {
    this.id = id;
    this.title = title;
    this.price = price;
    this.descriptionSmall = descriptionSmall;
    this.descriptionFull = descriptionFull;
    this.sold = sold;
    this.quantity = quantity;
    //this.categories = categories;
    //this.img =  img;
  }

}
