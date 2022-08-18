import type { DataSource, Repository } from 'typeorm';
import { ImagesEntity } from '../entities/images.entity';

export const ImageRepository =  Symbol('IMAGE_REPOSITORY');

export const imageRepositoryFactory = (dataSource: DataSource): Repository<ImagesEntity> =>
  dataSource.getRepository(ImagesEntity).extend({});
