import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { ProvidersController } from './controllers/providers.controller';
import { ProvidersService } from './services/providers.service';
import { Provider } from './entities/provider.entity';
import { ProductsController } from './controllers/products.controller';
import { ProductsService } from './services/products.service';
import { Product } from './entities/product.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Provider, Product])],
  controllers: [ProvidersController, ProductsController],
  providers: [ProvidersService, ProductsService],
})
export class ProviderModule {}
