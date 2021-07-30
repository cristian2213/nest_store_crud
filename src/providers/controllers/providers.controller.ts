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
} from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse, ApiParam } from '@nestjs/swagger';
import { ProvidersService } from '../services/providers.service';
import { CreateProviderDto, UpdateProviderDto } from '../dtos/providers.dtos';

@ApiTags('providers')
@Controller('providers')
export class ProvidersController {
  constructor(private providersService: ProvidersService) {}

  @ApiOperation({
    summary: 'get all providers',
    description: 'Return a list with all products',
  })
  @ApiResponse({
    status: 200,
    isArray: true,
  })
  @Get()
  @HttpCode(HttpStatus.OK)
  getProviders() {
    return this.providersService.findAll();
  }

  @ApiOperation({
    summary: 'get all providers with their products',
    description: 'Return a list with all providers with their products',
  })
  @ApiResponse({
    status: 200,
    isArray: true,
  })
  @Get('products')
  @HttpCode(HttpStatus.OK)
  getProvidersWithProducts() {
    return this.providersService.getProvidersWithProducts();
  }

  @ApiOperation({
    summary: 'create a provider',
    description: 'Create a provider and it return it',
  })
  @ApiResponse({
    status: 201,
    isArray: true,
  })
  @Post()
  @HttpCode(HttpStatus.CREATED)
  create(@Body() payload: CreateProviderDto) {
    return this.providersService.create(payload);
  }

  @ApiOperation({
    summary: 'get only a provider',
    description: 'Return a provider',
  })
  @ApiResponse({
    status: 200,
    isArray: false,
  })
  @ApiParam({
    name: 'id',
    required: true,
    description: 'provider id',
  })
  @Get(':id')
  @HttpCode(HttpStatus.OK)
  getProvider(@Param('id', ParseIntPipe) id: number) {
    return this.providersService.findOne(id);
  }

  @ApiOperation({
    summary: 'update a provider',
    description: 'Update a provider and it return it',
  })
  @ApiResponse({
    status: 202,
    isArray: false,
  })
  @ApiParam({
    name: 'id',
    required: true,
    description: 'provider id',
  })
  @Put(':id')
  @HttpCode(HttpStatus.ACCEPTED)
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body() payload: UpdateProviderDto,
  ) {
    return this.providersService.update(id, payload);
  }

  @ApiOperation({
    summary: 'delete a provider',
    description: 'Delete a provider and it return it',
  })
  @ApiResponse({
    status: 202,
    isArray: false,
  })
  @ApiParam({
    name: 'id',
    required: true,
    description: 'provider id',
  })
  @Delete(':id')
  @HttpCode(HttpStatus.ACCEPTED)
  delete(@Param('id', ParseIntPipe) id: number) {
    return this.providersService.delete(id);
  }

  @ApiOperation({
    summary: 'get product by provider',
    description: 'Return a provider with all its products',
  })
  @ApiResponse({
    status: 200,
    isArray: true,
  })
  @ApiParam({
    name: 'id',
    required: true,
    description: 'provider id',
  })
  @Get(':id/products')
  @HttpCode(HttpStatus.OK)
  getProductsByProvider(@Param('id', ParseIntPipe) id: number) {
    return this.providersService.getProductsByProvider(id);
  }
}
