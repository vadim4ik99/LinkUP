import type { DataSource, Repository } from 'typeorm';
import { FileEntity } from '../entities/images.entity';

export const ImageRepository = Symbol('IMAGE_REPOSITORY');

export const imageRepositoryFactory = (
  dataSource: DataSource,
): Repository<FileEntity> => dataSource.getRepository(FileEntity).extend({});
