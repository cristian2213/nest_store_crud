import {
  Body,
  Controller,
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
import { ErrorLogService } from '../services/error-log.service';

@ApiTags('error-log')
@UseGuards(JwtAuthGuard)
@Controller('error-log')
export class ErrorLogController {
  constructor(private errorLogService: ErrorLogService) {}

  @ApiBearerAuth()
  @ApiOperation({ summary: 'get all error log' })
  @Get()
  @HttpCode(HttpStatus.OK)
  getAll() {
    return this.errorLogService.getAll();
  }

  @Public()
  @ApiBearerAuth()
  @ApiOperation({ summary: 'create error log' })
  @Post()
  @HttpCode(HttpStatus.CREATED)
  createLog(@Body() createErrorLog: CreateErrorLog) {
    return this.errorLogService.createLog(createErrorLog);
  }

  @ApiBearerAuth()
  @ApiOperation({ summary: 'get log' })
  @Get(':id')
  @HttpCode(HttpStatus.OK)
  getOne(@Param('id', ParseIntPipe) id: number) {
    return this.errorLogService.getOne(id);
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
    return this.errorLogService.downloadLog(id, res);
  }
}
