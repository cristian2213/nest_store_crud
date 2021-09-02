import { Repository } from 'typeorm';
import { Product } from 'src/providers/entities/product.entity';
import { Injectable } from '@nestjs/common';
import { CreateProductDto } from 'src/providers/dtos/products.dtos';
import { ProductReposity } from 'src/providers/repositories/product-repository';

@Injectable()
export class CreateProductService extends ProductReposity {
  constructor(public productsRepository: Repository<Product>) {
    super(productsRepository);
  }

  async createProduct(payload: CreateProductDto): Promise<Product> {
    const newProduct = await this.productsRepository.create(payload);
    return await this.productsRepository.save(newProduct);
  }
}
