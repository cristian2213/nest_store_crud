import {
  BadRequestException,
  HttpException,
  HttpStatus,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import {
  getManager,
  Repository,
  Transaction,
  TransactionManager,
} from 'typeorm';
import * as fs from 'fs';
import { CsvParser } from 'nest-csv-parser';
import {
  CreateProductDto,
  ProductToDeleteResponse,
  UpdateProductDto,
} from '../dtos/products.dtos';
import { Product, ProductRow } from '../entities/product.entity';
import { ProvidersService } from './providers.service';
import { erroMsgs } from 'src/utils/products-bulk-upload-msgs.util';
import { ErrorLogService } from 'src/error-log/services/error-log.service';
import {
  positiveNumberValidation,
  searchItem,
  validatePrice,
  validateString,
} from 'src/utils/fields-validation.util';

@Injectable()
export class ProductsService {
  constructor(
    private readonly csvParser: CsvParser,
    private providersService: ProvidersService,
    private errorLogService: ErrorLogService,
    @InjectRepository(Product) private productRepo: Repository<Product>, // injectProvidersRepository
  ) {}

  async findAll(): Promise<Product[]> | never {
    const products = await this.productRepo.find();
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

  async delete(id: number): Promise<ProductToDeleteResponse> {
    const product = await this.find(id);
    if (!product) throw new NotFoundException(`Product #${id} doesn't exist`);
    await this.productRepo.delete(product.id);
    return {
      response: `Product #${id} was deleted`,
      status: HttpStatus.OK,
    };
  }

  async productsBulkUploadValidation(file: Express.Multer.File) {
    if (!file || file === undefined)
      throw new BadRequestException(
        'Invalid file provided, only allowed format (.csv)',
      );

    const stream = await fs.createReadStream(file.path, { encoding: 'utf-8' });
    const entities = await this.csvParser.parse(
      stream,
      ProductRow,
      null,
      null,
      {
        from: 1,
        strict: true,
        separator: ',',
        skipLines: 1,
        headers: ['name', 'price', 'providerId'],
      },
    );

    if (!entities || entities.list.length < 1)
      throw new HttpException('Document No Content!', HttpStatus.BAD_REQUEST);

    const providers = await this.providersService.findAll();
    const total = entities.list.length;
    const products = [];
    const errorLog = [];
    const pushError = (
      target: any,
      item: any,
      row: number | false,
      errors: Array<string>,
    ) => {
      target.push({ ...item, row, errors });
    };

    entities.list.forEach(async (prod, index: number) => {
      const row = index + 2;
      try {
        // check providerId
        const providerId = positiveNumberValidation(prod.providerId);
        if (!providerId)
          return pushError(errorLog, prod, row, [
            erroMsgs.providerId.notPositive,
          ]);
        if (!searchItem(providerId, providers))
          return pushError(errorLog, prod, row, [erroMsgs.providerId.notFound]);

        // check price
        const price = validatePrice(prod.price);
        if (price === null)
          return pushError(errorLog, prod, row, [erroMsgs.price.void]);
        if (price === false)
          return pushError(errorLog, prod, row, [erroMsgs.price.cero]);

        // check name
        const name = validateString(prod.name);
        if (name === null)
          return pushError(errorLog, prod, row, [erroMsgs.name.num]);
        const nameLength = name.length;
        if (nameLength === 0)
          return pushError(errorLog, prod, row, [erroMsgs.name.empty]);
        if (nameLength > 255)
          return pushError(errorLog, prod, row, [erroMsgs.name.limit]);

        // repeated
        if (searchItem(name, providers))
          return pushError(errorLog, prod, row, [erroMsgs.global.repeated]);
        return products.push({ name, price, providerId });
      } catch (error) {
        pushError(errorLog, prod, row, [error.message.substring(0, 150)]);
      }
    });

    const errors = errorLog.length;
    const loads = products.length;
    await this.productsBulkUpload(products);
    await this.errorLogService.createLog({
      totalRecords: total,
      loads: products.length,
      erros: errors,
      errorLog: JSON.stringify(errorLog),
      file_path: file.path,
    });
    return { total, loads, errors, errorLog };
  }

  async productsBulkUpload(products: Product[]) {
    try {
      await getManager().transaction(async () => {
        await this.productRepo.save(products);
      });
      return true;
    } catch (error) {
      return error;
    }
  }
}
