import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CommonController } from './controllers/common.controller';
import { ImagesEntity } from './entities/images.entity';
import { ImageRepository, imageRepositoryFactory } from './repositories/image.repository';
import { CommonServiceImpl } from './services/common.service';
import { CommonService } from './services/common.service.abstract';

const imageRepository = {
  provide: ImageRepository,
  inject: ['DATA_SOURCE'],
  useFactory: imageRepositoryFactory,
};

const commonService = { provide: CommonService, useClass: CommonServiceImpl };

@Module({
  imports: [TypeOrmModule.forFeature([ImagesEntity])],
  controllers: [CommonController],
  providers: [imageRepository, commonService],
})
export class CommonModule {}
