import * as fs from 'fs';
import { Injectable, NotFoundException } from '@nestjs/common';
import { Repository } from 'typeorm';
import { ErrorLogRepository } from 'src/error-log/repositories/error-log-repository';
import { ErrorLog } from 'src/error-log/entities/error-log.entity';
import { FindLogService } from './find-log.service';

@Injectable()
export class DownloadLogService extends ErrorLogRepository {
  constructor(
    public errorLogRepository: Repository<ErrorLog>,
    private findLogService: FindLogService,
  ) {
    super(errorLogRepository);
  }

  async downloadLog(id: number, res): Promise<File> {
    const log: ErrorLog = await this.findLogService.findLog(id);
    if (!log) throw new NotFoundException(`Log #${id} doesn't exist`);

    const path = 'storage\\products\\error-log\\';
    if (!fs.existsSync(path)) {
      fs.mkdirSync(path, { recursive: true });
    }
    const file = log.file_path.split('\\').slice(-1)[0].split('.')[0] + '.txt';
    const filePath = path + file;
    if (fs.existsSync(filePath)) {
      return res.download(filePath);
    }
    const content = JSON.parse(log.errorLog).map((prod) => {
      const { name, price, providerId, row, errors } = prod;
      return `Name: ${name}, Row: ${row}, Price: ${price}, ProviderId: ${providerId} \n \t Errors: ${errors.join(
        ' - ',
      )} \n \n`;
    });
    fs.writeFileSync(filePath, content.join(''), { encoding: 'utf-8' });
    return res.download(filePath);
  }
}
