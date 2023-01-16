import { IsInt, IsNotEmpty, IsString } from 'class-validator';

export class FileDTO {

  @IsInt()
  @IsNotEmpty()
  public id!: number;

  @IsString()
  public path!: string;

  @IsInt()
  public size!: number;


}
