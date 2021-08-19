import {
  Length,
  IsNumber,
  IsString,
  IsNotEmpty,
  IsPositive,
} from 'class-validator';
import { PartialType, ApiProperty } from '@nestjs/swagger';

export class CreateProductDto {
  @IsNotEmpty()
  @IsString()
  @Length(1, 255)
  @ApiProperty({
    required: true,
    type: String,
    description: 'product name',
    example: 'keyboard',
    minLength: 1,
    maxLength: 255,
    nullable: false,
  })
  readonly name: string;

  @IsNotEmpty()
  @IsNumber()
  @IsPositive()
  @ApiProperty({
    required: true,
    type: Number,
    description: 'product price',
    example: 1000,
    nullable: false,
  })
  readonly price: number;

  @IsNotEmpty()
  @IsNumber()
  @IsPositive()
  @ApiProperty({
    required: true,
    type: Number,
    description: 'provider id',
    example: 1,
    nullable: false,
  })
  readonly providerId: number;
}

export class UpdateProductDto extends PartialType(CreateProductDto) {}

export class ProductNotFoundResponse {
  @IsNumber()
  @ApiProperty({
    type: Number,
    example: 404,
  })
  statusCode: number;

  @IsString()
  @ApiProperty({
    type: String,
    example: "Product #1 doesn't exist",
  })
  message: string;

  @IsString()
  @ApiProperty({
    type: String,
    example: 'Not Found',
  })
  error: string;
}

export class ProductToDeleteResponse {
  @IsString()
  @ApiProperty({
    type: String,
    example: 'Product #1 was deleted',
  })
  response: string;

  @IsNumber()
  @ApiProperty({
    type: Number,
    example: 200,
  })
  status: number;
}
