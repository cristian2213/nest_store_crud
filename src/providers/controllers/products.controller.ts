import {
  Body,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  ParseIntPipe,
  Post,
  Put,
  Delete,
  UseGuards,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
// import { AuthGuard } from '@nestjs/passport';
import {
  ApiTags,
  ApiOperation,
  ApiResponse,
  ApiBearerAuth,
} from '@nestjs/swagger';
import { Express } from 'express';
import { FileInterceptor } from '@nestjs/platform-express';
import {
  CreateProductDto,
  ProductNotFoundResponse,
  UpdateProductDto,
} from '../dtos/products.dtos';
import { JwtAuthGuard } from '../../auth/guards/jwt-auth.guard';
import { Public } from '../../auth/decorators/public.decorator';
import { multerOptions } from 'src/utils/file-uploading.util';
import { FindProductsService } from '../services/products-services/find-products.service';
import { FindProductService } from '../services/products-services/find-product.service';
import { CreateProductService } from '../services/products-services/create-product.service';
import { UpdateProductService } from '../services/products-services/update-product.service';
import { DeleteProductService } from '../services/products-services/delete-product.service';
import { GetProductsWithProvider } from '../services/products-services/get-products-with-provider.service';
import { GetProductWithProvider } from '../services/products-services/get-product-with-provider.service';
import { ProductsBulkUpload } from '../services/products-services/products-bulk-upload.service';

// @UseGuards(AuthGuard('jwt'))
@UseGuards(JwtAuthGuard)
@ApiTags('products')
@Controller('products')
export class ProductsController {
  constructor(
    private findProductsService: FindProductsService,
    private findProductService: FindProductService,
    private createProductService: CreateProductService,
    private updateProductService: UpdateProductService,
    private deleteProductService: DeleteProductService,
    private getProductsWithProviderAtr: GetProductsWithProvider,
    private getProductWithProviderAtr: GetProductWithProvider,
    private productsBulkUploadAtr: ProductsBulkUpload,
  ) {}

  @Public()
  @ApiOperation({ summary: 'get all products' })
  @ApiResponse({ status: HttpStatus.NO_CONTENT, description: 'No Content' })
  @Get()
  @HttpCode(HttpStatus.OK)
  getProducts() {
    return this.findProductsService.findProducts();
  }

  @ApiOperation({ summary: 'create a product' })
  @Post()
  @HttpCode(HttpStatus.CREATED)
  createProduct(@Body() createProductDto: CreateProductDto) {
    return this.createProductService.createProduct(createProductDto);
  }

  @ApiBearerAuth()
  @ApiOperation({ summary: 'get products with provider' })
  @ApiResponse({ status: HttpStatus.NO_CONTENT, description: 'No Content' })
  @Get('provider')
  @HttpCode(HttpStatus.OK)
  getProductsWithProvider() {
    return this.getProductsWithProviderAtr.getProductsWithProvider();
  }

  @ApiBearerAuth()
  @ApiOperation({ summary: 'get product with its provider' })
  @ApiResponse({ type: ProductNotFoundResponse, status: 404 })
  @Get(':id/provider')
  @HttpCode(HttpStatus.OK)
  getProductWithProvider(@Param('id', ParseIntPipe) id: number) {
    return this.getProductWithProviderAtr.getProductWithProvider(id);
  }

  @Public()
  @ApiOperation({ summary: 'get only a product' })
  @ApiResponse({ type: ProductNotFoundResponse, status: 404 })
  @Get(':id')
  @HttpCode(HttpStatus.OK)
  getProduct(@Param('id', ParseIntPipe) id: number) {
    return this.findProductService.findProduct(id);
  }

  @ApiBearerAuth()
  @ApiOperation({ summary: 'update a product' })
  @ApiResponse({ type: ProductNotFoundResponse, status: 404 })
  @Put(':id')
  @HttpCode(HttpStatus.ACCEPTED)
  updateProduct(
    @Param('id', ParseIntPipe) id: number,
    @Body() payload: UpdateProductDto,
  ) {
    return this.updateProductService.updateProduct(id, payload);
  }

  @ApiBearerAuth()
  @ApiOperation({ summary: 'delete a product' })
  @ApiResponse({ type: ProductNotFoundResponse, status: 404 })
  @Delete(':id')
  @HttpCode(HttpStatus.OK)
  deleteProduct(@Param('id', ParseIntPipe) id: number) {
    return this.deleteProductService.deleteProduct(id);
  }

  @ApiOperation({ summary: 'upload product list' })
  @ApiBearerAuth()
  @HttpCode(HttpStatus.CREATED)
  @Post('bulk-upload')
  @UseInterceptors(
    FileInterceptor('products_list', multerOptions('./storage/products/csv')),
  )
  productsBulkUpload(@UploadedFile() file: Express.Multer.File) {
    return this.productsBulkUploadAtr.productsBulkUpload(file);
  }
}
