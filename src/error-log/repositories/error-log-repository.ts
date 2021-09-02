import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ErrorLog } from '../entities/error-log.entity';

export class ErrorLogRepository {
  constructor(
    @InjectRepository(ErrorLog) public errorLogRepository: Repository<ErrorLog>,
  ) {}
}
