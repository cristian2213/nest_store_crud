import { Injectable, NotFoundException } from '@nestjs/common';
import { ErrorLog } from 'src/error-log/entities/error-log.entity';
import { ErrorLogRepository } from 'src/error-log/repositories/error-log-repository';
import { Repository } from 'typeorm';

@Injectable()
export class FindLogService extends ErrorLogRepository {
  constructor(public errorLogRepository: Repository<ErrorLog>) {
    super(errorLogRepository);
  }

  async findLog(id: number): Promise<ErrorLog> | never {
    const log: ErrorLog = await this.errorLogRepository.findOne(id);
    if (!log) throw new NotFoundException(`Log #${id} doesn't exist`);
    return log;
  }
}
