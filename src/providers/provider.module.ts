import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CsvModule } from 'nest-csv-parser';

import { ProvidersController } from './controllers/providers.controller';
import { Provider } from './entities/provider.entity';
import { ProductsController } from './controllers/products.controller';
import { Product } from './entities/product.entity';
import { ErrorLogModule } from 'src/error-log/error-log.module';
import { FindProductsService } from './services/products-services/find-products.service';
import { FindProductService } from './services/products-services/find-product.service';
import { CreateProductService } from './services/products-services/create-product.service';
import { UpdateProductService } from './services/products-services/update-product.service';
import { DeleteProductService } from './services/products-services/delete-product.service';
import { GetProductsWithProvider } from './services/products-services/get-products-with-provider.service';
import { GetProductWithProvider } from './services/products-services/get-product-with-provider.service';
import { ProductsBulkUpload } from './services/products-services/products-bulk-upload.service';
import { ReadingCSVFile } from './services/products-services/reading-cvc-file.service';
import { BulkUploadCSVValidation } from './services/products-services/bulk-upload-csv-validation.service';
import { FindProvidersService } from './services/providers-services/find-providers.service';
import { CreateProviderService } from './services/providers-services/create-provider.service';
import { GetProvidersWithProductsService } from './services/providers-services/get-providers-with-products.service';
import { FindProviderService } from './services/providers-services/find-provider.service';
import { UpdateProviderService } from './services/providers-services/update-provider.service';
import { DeleteProviderService } from './services/providers-services/delete-provider.service';
import { GetProductsByProviderService } from './services/providers-services/get-products-by-provider.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([Provider, Product]),
    CsvModule,
    ErrorLogModule,
  ],
  controllers: [ProvidersController, ProductsController],
  providers: [
    FindProductsService,
    FindProductService,
    CreateProductService,
    UpdateProductService,
    DeleteProductService,
    GetProductsWithProvider,
    GetProductWithProvider,
    ProductsBulkUpload,
    ReadingCSVFile,
    BulkUploadCSVValidation,
    FindProvidersService,
    CreateProviderService,
    GetProvidersWithProductsService,
    FindProviderService,
    UpdateProviderService,
    DeleteProviderService,
    GetProductsByProviderService,
  ],
})
export class ProviderModule {}
