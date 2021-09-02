import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Param,
  Body,
  ParseIntPipe,
  HttpStatus,
  HttpCode,
  UseGuards,
} from '@nestjs/common';
import {
  ApiTags,
  ApiOperation,
  ApiResponse,
  ApiBearerAuth,
} from '@nestjs/swagger';
import {
  CreateProviderDto,
  UpdateProviderDto,
  ProviderNotFoundResponse,
} from '../dtos/providers.dtos';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { FindProvidersService } from '../services/providers-services/find-providers.service';
import { CreateProviderService } from '../services/providers-services/create-provider.service';
import { GetProvidersWithProductsService } from '../services/providers-services/get-providers-with-products.service';
import { FindProviderService } from '../services/providers-services/find-provider.service';
import { UpdateProviderService } from '../services/providers-services/update-provider.service';
import { DeleteProviderService } from '../services/providers-services/delete-provider.service';
import { GetProductsByProviderService } from '../services/providers-services/get-products-by-provider.service';

@ApiBearerAuth()
@ApiTags('providers')
@UseGuards(JwtAuthGuard)
@Controller('providers')
export class ProvidersController {
  constructor(
    private findProvidersService: FindProvidersService,
    private createProviderService: CreateProviderService,
    private getProvidersWithProductsService: GetProvidersWithProductsService,
    private findProviderService: FindProviderService,
    private updateProviderService: UpdateProviderService,
    private deleteProviderService: DeleteProviderService,
    private getProductsByProviderService: GetProductsByProviderService,
  ) {}

  @ApiOperation({ summary: 'get all providers' })
  @ApiResponse({ status: HttpStatus.NO_CONTENT, description: 'No Content' })
  @Get()
  @HttpCode(HttpStatus.OK)
  getProviders() {
    return this.findProvidersService.findProviders();
  }

  @ApiOperation({ summary: 'create a provider' })
  @Post()
  @HttpCode(HttpStatus.CREATED)
  create(@Body() payload: CreateProviderDto) {
    return this.createProviderService.createProvider(payload);
  }

  @ApiOperation({ summary: 'get all providers with their products' })
  @ApiResponse({ status: HttpStatus.NO_CONTENT, description: 'No Content' })
  @Get('products')
  @HttpCode(HttpStatus.OK)
  getProvidersWithProducts() {
    return this.getProvidersWithProductsService.getProvidersWithProducts();
  }

  @ApiOperation({ summary: 'get only a provider' })
  @ApiResponse({ type: ProviderNotFoundResponse, status: 404 })
  @HttpCode(HttpStatus.OK)
  @Get(':id')
  getProvider(@Param('id', ParseIntPipe) id: number) {
    return this.findProviderService.findProvider(id);
  }

  @ApiOperation({ summary: 'update a provider' })
  @ApiResponse({ type: ProviderNotFoundResponse, status: 404 })
  @Put(':id')
  @HttpCode(HttpStatus.ACCEPTED)
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body() payload: UpdateProviderDto,
  ) {
    return this.updateProviderService.updateProvider(id, payload);
  }

  @ApiOperation({ summary: 'delete a provider' })
  @ApiResponse({ type: ProviderNotFoundResponse, status: 404 })
  @Delete(':id')
  @HttpCode(HttpStatus.ACCEPTED)
  delete(@Param('id', ParseIntPipe) id: number) {
    return this.deleteProviderService.deleteProvider(id);
  }

  @ApiOperation({ summary: 'get product by provider' })
  @ApiResponse({ status: HttpStatus.NO_CONTENT, description: 'No Content' })
  @Get(':id/products')
  @HttpCode(HttpStatus.OK)
  getProductsByProvider(@Param('id', ParseIntPipe) id: number) {
    return this.getProductsByProviderService.getProductsByProvider(id);
  }
}
