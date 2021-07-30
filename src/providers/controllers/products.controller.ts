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
} from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse, ApiParam } from '@nestjs/swagger';
import { CreateProductDto, UpdateProductDto } from '../dtos/products.dtos';
import { ProductsService } from '../services/products.service';

@ApiTags('products')
@Controller('products')
export class ProductsController {
  constructor(private productsService: ProductsService) {}

  @ApiOperation({
    summary: 'get all products',
    description: 'Return a list with products',
  })
  @ApiResponse({
    status: 200,
    isArray: true,
  })
  @Get()
  @HttpCode(HttpStatus.OK)
  getProducts() {
    return this.productsService.findAll();
  }

  @ApiOperation({
    summary: 'create a product',
    description: 'Return the product created',
  })
  @ApiResponse({
    status: 202,
    isArray: false,
  })
  @Post()
  @HttpCode(HttpStatus.CREATED)
  create(@Body() createProductDto: CreateProductDto) {
    return this.productsService.create(createProductDto);
  }

  @ApiOperation({
    summary: 'get products with provider',
    description: 'Return a list of products with its provider',
  })
  @ApiResponse({
    status: 200,
    isArray: true,
  })
  @Get('provider')
  @HttpCode(HttpStatus.OK)
  getProductsWithProvider() {
    return this.productsService.getProductsWithProvider();
  }

  @ApiOperation({
    summary: 'get product with its provider',
    description: 'Return a product with its provider',
  })
  @ApiResponse({
    status: 200,
    isArray: false,
  })
  @ApiParam({
    name: 'id',
    required: true,
    description: 'product id',
  })
  @Get(':id/provider')
  @HttpCode(HttpStatus.OK)
  getProductWithProvider(@Param('id', ParseIntPipe) id: number) {
    return this.productsService.getProductWithProvider(id);
  }

  @ApiOperation({
    summary: 'get only a product',
    description: 'Return only a product',
  })
  @ApiResponse({
    status: 200,
    isArray: false,
  })
  @ApiParam({
    name: 'id',
    required: true,
    description: 'product id',
  })
  @Get(':id')
  @HttpCode(HttpStatus.OK)
  getProduct(@Param('id', ParseIntPipe) id: number) {
    return this.productsService.find(id);
  }

  @ApiOperation({
    summary: 'update a product',
    description: 'Update a product and it return it',
  })
  @ApiResponse({
    status: 202,
    isArray: false,
  })
  @ApiParam({
    name: 'id',
    required: true,
    description: 'product id',
  })
  @Put(':id')
  @HttpCode(HttpStatus.ACCEPTED)
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body() payload: UpdateProductDto,
  ) {
    return this.productsService.update(id, payload);
  }
}
