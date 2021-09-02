import { Injectable } from '@nestjs/common';
import { ErrorLog } from 'src/error-log/entities/error-log.entity';
import { ErrorLogRepository } from 'src/error-log/repositories/error-log-repository';
import { Repository } from 'typeorm';

@Injectable()
export class FindLogsService extends ErrorLogRepository {
  constructor(public errorLogRepository: Repository<ErrorLog>) {
    super(errorLogRepository);
  }

  async findLogs(): Promise<ErrorLog[]> {
    const errorLog: ErrorLog[] = await this.errorLogRepository.find();
    return errorLog;
  }
}
