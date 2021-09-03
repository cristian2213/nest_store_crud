import { Repository } from 'typeorm';
import { Product } from 'src/providers/entities/product.entity';
import { Injectable } from '@nestjs/common';
import { ProductReposity } from 'src/providers/repositories/product-repository';

@Injectable()
export class FindProductsService extends ProductReposity {
  constructor(public productsRepository: Repository<Product>) {
    super(productsRepository);
  }

  async findProducts(): Promise<Product[]> | never {
    return this.productsRepository.find();
  }
}
