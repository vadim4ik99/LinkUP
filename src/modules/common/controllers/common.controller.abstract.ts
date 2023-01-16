import type { DeleteResult } from 'typeorm';
import type { DeleteImageDTO } from '../dto/delete-image.dto';
import type { FileEntity } from '../entities/images.entity';

export abstract class CommonControllerAbs {

  public abstract upload(file: Express.Multer.File): Promise<FileEntity>;

  public abstract deleteImage(name: DeleteImageDTO): Promise<DeleteResult>;

}
