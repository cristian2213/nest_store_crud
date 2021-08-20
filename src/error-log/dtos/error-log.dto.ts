import { IsNotEmpty, IsNumber, IsPositive, IsString } from 'class-validator';
import { ApiProperty, PartialType } from '@nestjs/swagger';

export class CreateErrorLog {
  @IsNotEmpty()
  @IsNumber()
  @IsPositive()
  @ApiProperty({
    required: true,
    type: Number,
    nullable: false,
  })
  totalRecords: number;

  @IsNumber()
  @IsNotEmpty()
  @ApiProperty({
    required: true,
    type: Number,
    nullable: false,
  })
  loads: number;

  @IsNumber()
  @IsNotEmpty()
  @ApiProperty({
    required: true,
    type: Number,
    nullable: false,
  })
  erros: number;

  @IsString()
  @IsNotEmpty()
  @ApiProperty({
    required: true,
    type: String,
    description: 'json array in string',
    nullable: false,
  })
  errorLog: string;

  @IsString()
  @IsNotEmpty()
  @ApiProperty({
    required: true,
    type: String,
    description: 'file path',
    nullable: false,
  })
  file_path: string;
}

export class UpdateErrorLog extends PartialType(CreateErrorLog) {}
