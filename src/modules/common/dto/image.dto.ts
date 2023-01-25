import { ApiProperty } from '@nestjs/swagger';
import { IsInt, IsNotEmpty, IsString } from 'class-validator';

export class FileDTO {

  @ApiProperty()
  @IsInt()
  @IsNotEmpty()
  public id!: number;

  @ApiProperty()
  @IsString()
  public path!: string;

  @ApiProperty()
  @IsInt()
  public size!: number;

}

export class FileUploadDto {

  @ApiProperty({ type: 'string', format: 'binary' })
  public file!: unknown;

}
