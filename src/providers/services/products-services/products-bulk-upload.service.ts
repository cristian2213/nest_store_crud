import { getManager, Repository } from 'typeorm';
import { Injectable } from '@nestjs/common';
import { Product, ProductRow } from 'src/providers/entities/product.entity';
import { ReadingCSVFile } from './reading-cvc-file.service';
import { ProductBulkLoadResponse } from 'src/providers/dtos/products.dtos';
import { BulkUploadCSVValidation } from './bulk-upload-csv-validation.service';
import { CreateLogService } from 'src/error-log/services/log-services/create-log.service';
import { ProductReposity } from 'src/providers/repositories/product-repository';

@Injectable()
export class ProductsBulkUpload extends ProductReposity {
  constructor(
    public productsRepository: Repository<Product>,
    private readingCSVFile: ReadingCSVFile,
    private bulkUploadCSVValidation: BulkUploadCSVValidation,
    private createLogService: CreateLogService,
  ) {
    super(productsRepository);
  }

  // : Promise<ProductBulkLoadResponse | never>
  async productsBulkUpload(
    file: Express.Multer.File,
  ): Promise<ProductBulkLoadResponse> {
    const products: ProductRow[] = await this.readingCSVFile.readingCSVFile(
      file,
      ['name', 'price', 'providerId'],
    );

    const result = await this.bulkUploadCSVValidation.validateProducts(
      products,
    );
    const {
      total,
      loads,
      products: productsCollection,
      errors,
      errorLog,
    } = result;
    await this.productsInsertion(productsCollection);
    await this.createLogService.createLog({
      totalRecords: total,
      loads: products.length,
      erros: errors,
      errorLog: JSON.stringify(errorLog),
      file_path: file.path,
    });
    return { total, loads, errors, errorLog };
  }

  async productsInsertion(products: Product[]): Promise<boolean | never> {
    try {
      await getManager().transaction(async () => {
        await this.productsRepository.save(products);
      });
      return true;
    } catch (error) {
      return error;
    }
  }
}
