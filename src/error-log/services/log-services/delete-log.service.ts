import { HttpStatus, Injectable, NotFoundException } from '@nestjs/common';
import { ErrorLog } from 'src/error-log/entities/error-log.entity';
import { ErrorLogRepository } from 'src/error-log/repositories/error-log-repository';
import { Repository } from 'typeorm';
import { FindLogService } from './find-log.service';

@Injectable()
export class DeleteLogService extends ErrorLogRepository {
  constructor(
    public errorLogRepository: Repository<ErrorLog>,
    private findLogService: FindLogService,
  ) {
    super(errorLogRepository);
  }

  async deleteLog(id: number) {
    const log = await this.findLogService.findLog(id);
    if (!log) throw new NotFoundException(`Log #${id} doesn't exist`);
    await this.errorLogRepository.delete(id);
    return {
      status: HttpStatus.OK,
      message: `Log #${id} was deleted`,
    };
  }
}
