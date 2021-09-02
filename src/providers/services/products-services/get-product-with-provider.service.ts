import { Repository } from 'typeorm';
import { Injectable, NotFoundException } from '@nestjs/common';
import { Product } from 'src/providers/entities/product.entity';
import { ProductReposity } from 'src/providers/repositories/product-repository';

@Injectable()
export class GetProductWithProvider extends ProductReposity {
  constructor(public productsRepository: Repository<Product>) {
    super(productsRepository);
  }

  async getProductWithProvider(id: number): Promise<Product> {
    const product = await this.productsRepository.findOne({
      relations: ['provider'],
      where: { id },
    });
    if (!product) throw new NotFoundException(`Product #${id} doesn't exist`);
    return product;
  }
}
