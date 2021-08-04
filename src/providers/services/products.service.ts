import {
  HttpException,
  HttpStatus,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateProductDto, UpdateProductDto } from '../dtos/products.dtos';
import { Product } from '../entities/product.entity';

@Injectable()
export class ProductsService {
  constructor(
    @InjectRepository(Product) private productRepo: Repository<Product>,
  ) {}

  async findAll(): Promise<Product[]> | never {
    const products = await this.productRepo.find();
    if (products.length < 1)
      throw new HttpException('No Content', HttpStatus.NO_CONTENT);
    return products;
  }

  async find(id: number): Promise<Product> | never {
    const product = await this.productRepo.findOne(id);
    if (!product || Object.values(product).length < 1)
      throw new NotFoundException(`Product #${id} doesn't exist`);

    return product;
  }

  async create(payload: CreateProductDto): Promise<Product> {
    const newProduct = await this.productRepo.create(payload);
    return await this.productRepo.save(newProduct);
  }

  async update(
    id: number,
    payload: UpdateProductDto,
  ): Promise<Product> | never {
    const product = await this.productRepo.findOne(id);

    if (!product || Object.values(product).length < 1)
      throw new NotFoundException(`Product #${id} doesn't exist`);

    this.productRepo.merge(product, payload);
    return await this.productRepo.save(product);
  }

  async getProductsWithProvider(): Promise<Product[]> | never {
    const products = await this.productRepo.find({ relations: ['provider'] });
    if (products.length < 1)
      throw new HttpException('No Content', HttpStatus.NO_CONTENT);
    return products;
  }

  async getProductWithProvider(id: number): Promise<Product> {
    const product = await this.productRepo.findOne({
      relations: ['provider'],
      where: { id },
    });
    if (!product) throw new NotFoundException(`Product #${id} doesn't exist`);
    return product;
  }
}
