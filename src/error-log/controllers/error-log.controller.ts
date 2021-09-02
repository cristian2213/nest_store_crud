import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  ParseIntPipe,
  Post,
  Res,
  UseGuards,
} from '@nestjs/common';
import { Response } from 'express';
import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger';
import { Public } from 'src/auth/decorators/public.decorator';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { CreateErrorLog } from '../dtos/error-log.dto';
import { CreateLogService } from '../services/log-services/create-log.service';
import { FindLogsService } from '../services/log-services/find-logs.service';
import { FindLogService } from '../services/log-services/find-log.service';
import { DeleteLogService } from '../services/log-services/delete-log.service';
import { DownloadLogService } from '../services/log-services/download-log.service';

@ApiTags('error-log')
@UseGuards(JwtAuthGuard)
@Controller('error-log')
export class ErrorLogController {
  constructor(
    private createLogService: CreateLogService,
    private findLogsService: FindLogsService,
    private findLogService: FindLogService,
    private deleteLogService: DeleteLogService,
    private downloadLogService: DownloadLogService,
  ) {}

  @ApiBearerAuth()
  @ApiOperation({ summary: 'get all error log' })
  @Get()
  @HttpCode(HttpStatus.OK)
  getAll() {
    return this.findLogsService.findLogs();
  }

  @Public()
  @ApiBearerAuth()
  @ApiOperation({ summary: 'create error log' })
  @Post()
  @HttpCode(HttpStatus.CREATED)
  createLog(@Body() createErrorLog: CreateErrorLog) {
    return this.createLogService.createLog(createErrorLog);
  }

  @ApiBearerAuth()
  @ApiOperation({ summary: 'get log' })
  @Get(':id')
  @HttpCode(HttpStatus.OK)
  getOne(@Param('id', ParseIntPipe) id: number) {
    return this.findLogService.findLog(id);
  }

  @ApiBearerAuth()
  @ApiOperation({ summary: 'delete log' })
  @Delete(':id')
  @HttpCode(HttpStatus.OK)
  deleteLog(@Param('id', ParseIntPipe) id: number) {
    return this.deleteLogService.deleteLog(id);
  }

  @Public()
  @ApiBearerAuth()
  @ApiOperation({ summary: 'download error log file' })
  @Get(':id/download')
  @HttpCode(HttpStatus.OK)
  async downloadLog(
    @Param('id', ParseIntPipe) id: number,
    @Res() res: Response,
  ) {
    return this.downloadLogService.downloadLog(id, res);
  }
}
