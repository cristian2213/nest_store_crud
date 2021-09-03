import { Repository } from 'typeorm';
import { Product } from 'src/providers/entities/product.entity';
import { Injectable, NotFoundException } from '@nestjs/common';
import { UpdateProductDto } from 'src/providers/dtos/products.dtos';
import { FindProductService } from './find-product.service';
import { ProductReposity } from 'src/providers/repositories/product-repository';

@Injectable()
export class UpdateProductService extends ProductReposity {
  constructor(
    public productsRepository: Repository<Product>,
    private findProductService: FindProductService,
  ) {
    super(productsRepository);
  }

  async updateProduct(
    id: number,
    payload: UpdateProductDto,
  ): Promise<Product> | never {
    const product = await this.findProductService.findProduct(id);

    if (!product || Object.values(product).length < 1)
      throw new NotFoundException(`Product #${id} doesn't exist`);

    this.productsRepository.merge(product, payload);
    return this.productsRepository.save(product);
  }
}
