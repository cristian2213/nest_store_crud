import { Injectable } from '@nestjs/common';
import {
  positiveNumberValidation,
  searchItem,
  validatePrice,
  validateString,
} from 'src/utils/fields-validation.util';
import { erroMsgs } from 'src/utils/products-bulk-upload-msgs.util';
import { FindProvidersService } from '../providers-services/find-providers.service';

@Injectable()
export class BulkUploadCSVValidation {
  constructor(private findProvidersService: FindProvidersService) {}

  async validateProducts(fileContent: Array<any>) {
    const providers = await this.findProvidersService.findProviders();
    const total = fileContent.length;
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

    fileContent.forEach(async (prod, index: number) => {
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
    return { total, loads, products, errors, errorLog };
  }
}
