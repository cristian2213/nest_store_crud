import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ErrorLogController } from './controllers/error-log.controller';
import { ErrorLog } from './entities/error-log.entity';
import { FindLogsService } from './services/log-services/find-logs.service';
import { FindLogService } from './services/log-services/find-log.service';
import { CreateLogService } from './services/log-services/create-log.service';
import { DeleteLogService } from './services/log-services/delete-log.service';
import { DownloadLogService } from './services/log-services/download-log.service';

@Module({
  imports: [TypeOrmModule.forFeature([ErrorLog])],
  controllers: [ErrorLogController],
  providers: [
    FindLogsService,
    FindLogService,
    CreateLogService,
    DeleteLogService,
    DownloadLogService,
  ],
  exports: [CreateLogService],
})
export class ErrorLogModule {}
