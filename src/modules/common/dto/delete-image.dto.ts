import { IsNotEmpty, IsString } from 'class-validator';

export class DeleteImageDTO {

  @IsString()
  @IsNotEmpty()
  public name!: string;

}
