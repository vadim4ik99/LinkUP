export class CategoriesDTO {

  private name: string;
  private img: number[];

  constructor(name: string, img: number[]) {
    this.name = name;
    this.img =  img;
  }

}
