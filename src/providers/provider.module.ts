import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { ProvidersController } from './controllers/providers.controller';
import { ProvidersService } from './services/providers.service';
import { Provider } from './entities/provider.entity';
import { ProductsController } from './controllers/products.controller';
import { ProductsService } from './services/products.service';
import { Product } from './entities/product.entity';
import { MulterModule } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { editFileName, fileFilter } from 'src/utils/file-uploading.util';
import { ConfigModule, ConfigService } from '@nestjs/config';

@Module({
  imports: [
    TypeOrmModule.forFeature([Provider, Product]),
    // MulterModule.registerAsync({
    //   imports: [ConfigModule],
    //   inject: [ConfigService],
    //   useFactory: () => ({
    //     storage: diskStorage({
    //       destination: './storage/products/csv',
    //       filename: editFileName,
    //     }),
    //     fileFilter: fileFilter,
    //     limits: { files: 1 },
    //   }),
    // }),
  ],
  controllers: [ProvidersController, ProductsController],
  providers: [ProvidersService, ProductsService],
})
export class ProviderModule {}
