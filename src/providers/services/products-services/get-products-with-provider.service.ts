import { Injectable } from '@nestjs/common';
import { Product } from 'src/providers/entities/product.entity';
import { ProductReposity } from 'src/providers/repositories/product-repository';
import { Repository } from 'typeorm';

@Injectable()
export class GetProductsWithProvider extends ProductReposity {
  constructor(public productsRepository: Repository<Product>) {
    super(productsRepository);
  }

  async getProductsWithProvider(): Promise<Product[]> | never {
    return this.productsRepository.find({
      relations: ['provider'],
    });
  }
}
