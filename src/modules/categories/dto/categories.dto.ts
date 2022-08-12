export class CategoriesDTO {

  public id: number;
  public name: string;
  //private img: number[];

  constructor(id: number, name: string) {
    this.name = name;
    this.id =  id;
  }

}
