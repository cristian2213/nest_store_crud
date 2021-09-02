import { Repository } from 'typeorm';
import { Product } from 'src/providers/entities/product.entity';
import { Injectable, NotFoundException } from '@nestjs/common';
import { ProductReposity } from 'src/providers/repositories/product-repository';

@Injectable()
export class FindProductService extends ProductReposity {
  constructor(public productsRepository: Repository<Product>) {
    super(productsRepository);
  }

  async findProduct(id: number): Promise<Product> | never {
    const product = await this.productsRepository.findOne(id);
    if (!product || Object.values(product).length < 1)
      throw new NotFoundException(`Product #${id} doesn't exist`);

    return product;
  }
}
