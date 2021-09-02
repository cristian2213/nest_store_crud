import * as fs from 'fs';
import {
  BadRequestException,
  HttpException,
  HttpStatus,
  Injectable,
} from '@nestjs/common';
import { ProductRow } from 'src/providers/entities/product.entity';
import { CsvParser } from 'nest-csv-parser';

@Injectable()
export class ReadingCSVFile {
  constructor(private readonly csvParser: CsvParser) {}

  async readingCSVFile(
    file: Express.Multer.File,
    columns: string[],
  ): Promise<ProductRow[]> {
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
        headers: [...columns],
      },
    );

    if (!entities || entities.list.length < 1)
      throw new HttpException('Document No Content!', HttpStatus.BAD_REQUEST);

    return entities.list;
  }
}
