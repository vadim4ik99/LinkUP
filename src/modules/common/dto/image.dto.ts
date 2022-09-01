import { IsEnum, IsInt, IsNotEmpty, IsString } from 'class-validator';
import { ImageType } from '../entities/images.entity';

export class FileDTO {
  @IsInt()
  @IsNotEmpty()
  public id!: number;

  @IsString()
  public path!: string;

  @IsInt()
  public size!: number;

  @IsEnum(ImageType)
  public type!: ImageType;
}
