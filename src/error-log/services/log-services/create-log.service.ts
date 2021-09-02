import { Injectable } from '@nestjs/common';
import { CreateErrorLog } from 'src/error-log/dtos/error-log.dto';
import { ErrorLog } from 'src/error-log/entities/error-log.entity';
import { ErrorLogRepository } from 'src/error-log/repositories/error-log-repository';
import { Repository } from 'typeorm';

@Injectable()
export class CreateLogService extends ErrorLogRepository {
  constructor(public errorLogRepository: Repository<ErrorLog>) {
    super(errorLogRepository);
  }

  async createLog(createErrorLog: CreateErrorLog): Promise<ErrorLog> {
    const newLog = await this.errorLogRepository.create(createErrorLog);
    return await this.errorLogRepository.save(newLog);
  }
}
