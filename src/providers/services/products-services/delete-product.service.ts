import { Repository } from 'typeorm';
import { HttpStatus, Injectable, NotFoundException } from '@nestjs/common';
import { Product } from 'src/providers/entities/product.entity';
import { ProductToDeleteResponse } from 'src/providers/dtos/products.dtos';
import { FindProductService } from './find-product.service';
import { ProductReposity } from 'src/providers/repositories/product-repository';

@Injectable()
export class DeleteProductService extends ProductReposity {
  constructor(
    public productsRepository: Repository<Product>,
    private findProductService: FindProductService,
  ) {
    super(productsRepository);
  }

  async deleteProduct(id: number): Promise<ProductToDeleteResponse> {
    const product = await this.findProductService.findProduct(id);
    if (!product) throw new NotFoundException(`Product #${id} doesn't exist`);
    await this.productsRepository.delete(product.id);
    return {
      response: `Product #${id} was deleted`,
      status: HttpStatus.OK,
    };
  }
}
