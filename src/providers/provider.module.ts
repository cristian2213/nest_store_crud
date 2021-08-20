import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CsvModule } from 'nest-csv-parser';

import { ProvidersController } from './controllers/providers.controller';
import { ProvidersService } from './services/providers.service';
import { Provider } from './entities/provider.entity';
import { ProductsController } from './controllers/products.controller';
import { ProductsService } from './services/products.service';
import { Product } from './entities/product.entity';
import { ErrorLogModule } from 'src/error-log/error-log.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([Provider, Product]),
    CsvModule,
    ErrorLogModule,
  ],
  controllers: [ProvidersController, ProductsController],
  providers: [ProvidersService, ProductsService],
})
export class ProviderModule {}
