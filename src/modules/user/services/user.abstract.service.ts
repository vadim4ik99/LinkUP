export abstract class UserAbstract {

  private first_name: string;
  private last_name: string;
  private verify: boolean;
  private email: string;
  private avatar: number;
  private password: string;

  constructor(first_name:string , last_name:string, verify:boolean, email:string , avatar:number, password:string   ) {
    this.first_name = first_name;
    this.last_name = last_name;
    this.verify = verify;
    this.email = email;
    this.avatar = avatar;
    this.password = password;
  }

}
