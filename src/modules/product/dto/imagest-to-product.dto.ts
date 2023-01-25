import { ApiProperty } from '@nestjs/swagger';

export class SetImagesToProductDTO {

  @ApiProperty({ type: [String] })
  // find check value to string array
  public imagesNames!: string[];

}
