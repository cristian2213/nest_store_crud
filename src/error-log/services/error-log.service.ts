import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import * as fs from 'fs';
import { ErrorLog } from '../entities/error-log.entity';
import { CreateErrorLog } from '../dtos/error-log.dto';

@Injectable()
export class ErrorLogService {
  constructor(
    @InjectRepository(ErrorLog)
    private errorLogRepository: Repository<ErrorLog>,
  ) {}

  async getAll(): Promise<ErrorLog[]> {
    const errorLog: ErrorLog[] = await this.errorLogRepository.find();
    return errorLog;
  }

  async getOne(id: number): Promise<ErrorLog> | never {
    const log: ErrorLog = await this.errorLogRepository.findOne(id);
    if (!log) throw new NotFoundException(`Log #${id} doesn't exist`);
    return log;
  }

  async createLog(createErrorLog: CreateErrorLog): Promise<ErrorLog> {
    const newLog = await this.errorLogRepository.create(createErrorLog);
    return await this.errorLogRepository.save(newLog);
  }

  async downloadLog(id: number, res): Promise<File> {
    const log: ErrorLog = await this.getOne(id);
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
