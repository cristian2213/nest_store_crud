import {
  BadRequestException,
  HttpException,
  HttpStatus,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { getManager, Repository } from 'typeorm';
import * as fs from 'fs';
import { CsvParser } from 'nest-csv-parser';
import {
  CreateProductDto,
  ProductToDeleteResponse,
  UpdateProductDto,
} from '../dtos/products.dtos';
import { Product, ProductRow } from '../entities/product.entity';
import { ProvidersService } from './providers.service';
import { errorMessages } from 'src/utils/products-bulk-upload-msgs.util';
import { ErrorLogService } from 'src/error-log/services/error-log.service';

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

    const stream = await fs.createReadStream(file.path, {
      encoding: 'utf-8',
    });
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
    const successData = [];
    const invalidDataLog = [];
    const total = entities.list.length;
    const pushError = (
      target: any,
      item: any,
      row: number | false,
      errors: Array<string>,
    ) => {
      target.push({ ...item, row, errors });
    };

    entities.list.forEach((row, index) => {
      try {
        const providerId = row.providerId.toString().trim();
        if (providerId.length > 0) {
          const checkProvider = providers.some(
            (prov) => prov.id === parseInt(providerId),
          );
          if (!checkProvider) {
            pushError(invalidDataLog, row, index + 2, [
              errorMessages.providerId.notFound,
            ]);
            return;
          }
          // check price
          const priceToStr = row.price.toString().trim();
          if (priceToStr.length > 0) {
            const regexPrice = /^(\d*([.,](?=\d{3}))?\d+)+((?!\2)[.,]\d\d)?$/;
            if (regexPrice.test(priceToStr)) {
              const productPrice = parseInt(priceToStr.replace(/[,. ]/g, ''));
              if (productPrice === 0) {
                pushError(invalidDataLog, row, index + 2, [
                  errorMessages.price.cero,
                ]);
                return;
              }

              // check name
              const productName = row.name.toString().trim();
              if (productName.length === 0 || productName.length > 255) {
                pushError(invalidDataLog, row, index + 2, [
                  errorMessages.name.void,
                ]);
                return;
              }
              // check repeated product
              if (this.checkRepeatingProducts(productName, successData)) {
                pushError(invalidDataLog, row, index + 2, [
                  errorMessages.global.repeated,
                ]);
                return;
              }
              successData.push({
                name: productName,
                price: productPrice,
                providerId: providerId,
              });
              return;
            }
            pushError(invalidDataLog, row, index + 2, [
              errorMessages.price.void,
            ]);
            return;
          }
          pushError(invalidDataLog, row, index + 2, [
            errorMessages.price.empty,
          ]);
          return;
        }
        pushError(invalidDataLog, row, index + 2, [
          errorMessages.providerId.empty,
        ]);
      } catch (error) {
        pushError(invalidDataLog, row, index + 2, [error.message]);
      }
    });

    const response = await this.insertProductsBulkUpload(
      successData,
      invalidDataLog,
      total,
      file.path,
    );

    return response instanceof Error
      ? errorMessages.bulkUploadMsg(response)
      : response;
  }

  async insertProductsBulkUpload(
    successData: Product[],
    unsuccessful: ProductRow[],
    total: number,
    file_path: string,
  ) {
    const totalSuccessful = successData.length;
    const totalUnsuccessful = unsuccessful.length;
    try {
      await getManager().transaction(async () => {
        await this.productRepo.save(successData);
      });

      this.errorLogService.createLog({
        totalRecords: total,
        loads: totalSuccessful,
        erros: totalUnsuccessful,
        errorLog: JSON.stringify(unsuccessful),
        file_path,
      });

      return {
        total: total,
        successful: totalSuccessful,
        unsuccessful: totalUnsuccessful,
        uploadedData: successData,
        rejectedData: unsuccessful,
      };
    } catch (error) {
      return error;
    }
  }

  checkRepeatingProducts(search: string, list: Array<any>): boolean {
    return list.some((prod) => prod.name.trim() === search);
  }
}
