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
} from '@nestjs/common';
// import { AuthGuard } from '@nestjs/passport';
import {
  ApiTags,
  ApiOperation,
  ApiResponse,
  ApiBearerAuth,
} from '@nestjs/swagger';
import {
  CreateProductDto,
  ProductNotFoundResponse,
  UpdateProductDto,
} from '../dtos/products.dtos';
import { ProductsService } from '../services/products.service';
import { JwtAuthGuard } from '../../auth/guards/jwt-auth.guard';
import { Public } from '../../auth/decorators/public.decorator';
import { AccessGuard } from '../guards/access.guard';

// @UseGuards(AuthGuard('jwt'))
@UseGuards(JwtAuthGuard)
@ApiTags('products')
@Controller('products')
export class ProductsController {
  constructor(private productsService: ProductsService) {}

  @Public()
  @ApiOperation({ summary: 'get all products' })
  @ApiResponse({ status: HttpStatus.NO_CONTENT, description: 'No Content' })
  @Get()
  @HttpCode(HttpStatus.OK)
  getProducts() {
    return this.productsService.findAll();
  }

  @ApiOperation({ summary: 'create a product' })
  @Post()
  @HttpCode(HttpStatus.CREATED)
  create(@Body() createProductDto: CreateProductDto) {
    return this.productsService.create(createProductDto);
  }

  @ApiBearerAuth()
  @ApiOperation({ summary: 'get products with provider' })
  @ApiResponse({ status: HttpStatus.NO_CONTENT, description: 'No Content' })
  @Get('provider')
  @HttpCode(HttpStatus.OK)
  getProductsWithProvider() {
    return this.productsService.getProductsWithProvider();
  }

  @ApiBearerAuth()
  @ApiOperation({ summary: 'get product with its provider' })
  @ApiResponse({ type: ProductNotFoundResponse, status: 404 })
  @Get(':id/provider')
  @HttpCode(HttpStatus.OK)
  getProductWithProvider(@Param('id', ParseIntPipe) id: number) {
    return this.productsService.getProductWithProvider(id);
  }

  @UseGuards(AccessGuard)
  @Public()
  @ApiOperation({ summary: 'get only a product' })
  @ApiResponse({ type: ProductNotFoundResponse, status: 404 })
  @Get(':id')
  @HttpCode(HttpStatus.OK)
  getProduct(@Param('id', ParseIntPipe) id: number) {
    return this.productsService.find(id);
  }

  @ApiBearerAuth()
  @ApiOperation({ summary: 'update a product' })
  @ApiResponse({ type: ProductNotFoundResponse, status: 404 })
  @Put(':id')
  @HttpCode(HttpStatus.ACCEPTED)
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body() payload: UpdateProductDto,
  ) {
    return this.productsService.update(id, payload);
  }

  @ApiBearerAuth()
  @ApiOperation({ summary: 'delete a product' })
  @ApiResponse({ type: ProductNotFoundResponse, status: 404 })
  @Delete(':id')
  @HttpCode(HttpStatus.OK)
  deleteProduct(@Param('id', ParseIntPipe) id: number) {
    return this.productsService.delete(id);
  }
}
