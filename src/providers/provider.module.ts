import {
  MiddlewareConsumer,
  Module,
  NestModule,
  RequestMethod,
} from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { ProvidersController } from './controllers/providers.controller';
import { ProvidersService } from './services/providers.service';
import { Provider } from './entities/provider.entity';
import { ProductsController } from './controllers/products.controller';
import { ProductsService } from './services/products.service';
import { Product } from './entities/product.entity';
import { AccessMiddleware } from './middlewares/access.middleware';

@Module({
  imports: [TypeOrmModule.forFeature([Provider, Product])],
  controllers: [ProvidersController, ProductsController],
  providers: [ProvidersService, ProductsService],
})
export class ProviderModule implements NestModule {
  configure(consumer: MiddlewareConsumer): void {
    // consumer.apply(AccessMiddleware).forRoutes('products');
    consumer
      .apply(AccessMiddleware)
      .forRoutes({ path: 'products', method: RequestMethod.GET });
  }
}
