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
import { ProvidersService } from '../services/providers.service';
import {
  CreateProviderDto,
  UpdateProviderDto,
  ProviderNotFoundResponse,
} from '../dtos/providers.dtos';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';

@ApiBearerAuth()
@ApiTags('providers')
@UseGuards(JwtAuthGuard)
@Controller('providers')
export class ProvidersController {
  constructor(private providersService: ProvidersService) {}

  @ApiOperation({ summary: 'get all providers' })
  @ApiResponse({ status: HttpStatus.NO_CONTENT, description: 'No Content' })
  @Get()
  @HttpCode(HttpStatus.OK)
  getProviders() {
    return this.providersService.findAll();
  }

  @ApiOperation({ summary: 'create a provider' })
  @Post()
  @HttpCode(HttpStatus.CREATED)
  create(@Body() payload: CreateProviderDto) {
    return this.providersService.create(payload);
  }

  @ApiOperation({ summary: 'get all providers with their products' })
  @ApiResponse({ status: HttpStatus.NO_CONTENT, description: 'No Content' })
  @Get('products')
  @HttpCode(HttpStatus.OK)
  getProvidersWithProducts() {
    return this.providersService.getProvidersWithProducts();
  }

  @ApiOperation({ summary: 'get only a provider' })
  @ApiResponse({ type: ProviderNotFoundResponse, status: 404 })
  @HttpCode(HttpStatus.OK)
  @Get(':id')
  getProvider(@Param('id', ParseIntPipe) id: number) {
    return this.providersService.findOne(id);
  }

  @ApiOperation({ summary: 'update a provider' })
  @ApiResponse({ type: ProviderNotFoundResponse, status: 404 })
  @Put(':id')
  @HttpCode(HttpStatus.ACCEPTED)
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body() payload: UpdateProviderDto,
  ) {
    return this.providersService.update(id, payload);
  }

  @ApiOperation({ summary: 'delete a provider' })
  @ApiResponse({ type: ProviderNotFoundResponse, status: 404 })
  @Delete(':id')
  @HttpCode(HttpStatus.ACCEPTED)
  delete(@Param('id', ParseIntPipe) id: number) {
    return this.providersService.delete(id);
  }

  @ApiOperation({ summary: 'get product by provider' })
  @ApiResponse({ status: HttpStatus.NO_CONTENT, description: 'No Content' })
  @Get(':id/products')
  @HttpCode(HttpStatus.OK)
  getProductsByProvider(@Param('id', ParseIntPipe) id: number) {
    return this.providersService.getProductsByProvider(id);
  }
}
