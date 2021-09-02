import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Product } from '../entities/product.entity';

export class ProductReposity {
  constructor(
    @InjectRepository(Product) public providerRepository: Repository<Product>,
  ) {}
}
