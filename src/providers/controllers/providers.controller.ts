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
import { ProvidersService } from '../services/providers.service';
import { CreateProviderDto, UpdateProviderDto } from '../dtos/providers.dtos';

@Controller('providers')
export class ProvidersController {
  constructor(private providersService: ProvidersService) {}

  @Get()
  @HttpCode(HttpStatus.OK)
  getProviders() {
    return this.providersService.findAll();
  }

  @Get('products')
  @HttpCode(HttpStatus.OK)
  getProvidersWithProducts() {
    return this.providersService.getProvidersWithProducts();
  }

  @Post()
  @HttpCode(HttpStatus.CREATED)
  create(@Body() payload: CreateProviderDto) {
    return this.providersService.create(payload);
  }

  @Get(':id')
  @HttpCode(HttpStatus.OK)
  getProvider(@Param('id', ParseIntPipe) id: number) {
    return this.providersService.findOne(id);
  }

  @Put(':id')
  @HttpCode(HttpStatus.ACCEPTED)
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body() payload: UpdateProviderDto,
  ) {
    return this.providersService.update(id, payload);
  }

  @Delete(':id')
  @HttpCode(HttpStatus.ACCEPTED)
  delete(@Param('id', ParseIntPipe) id: number) {
    return this.providersService.delete(id);
  }

  @Get(':id/products')
  @HttpCode(HttpStatus.ACCEPTED)
  getProductsByProvider(@Param('id', ParseIntPipe) id: number) {
    return this.providersService.getProductsByProvider(id);
  }
}
