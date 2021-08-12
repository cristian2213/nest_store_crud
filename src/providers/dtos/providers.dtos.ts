import { IsNotEmpty, IsNumber, IsString, Length } from 'class-validator';
import { PartialType, ApiProperty } from '@nestjs/swagger';

export class CreateProviderDto {
  @IsString()
  @IsNotEmpty()
  @Length(1, 150)
  @ApiProperty({
    required: true,
    type: String,
    example: 'friedrich',
    minLength: 1,
    maxLength: 150,
    nullable: false,
  })
  readonly name: string;
}

export class UpdateProviderDto extends PartialType(CreateProviderDto) {}

export class ProviderNotFoundResponse {
  @IsNumber()
  @ApiProperty({
    type: Number,
    example: 404,
  })
  readonly statusCode: number;

  @IsString()
  @ApiProperty({
    type: String,
    example: "Provider #1 doesn't exist",
  })
  readonly message: string;

  @IsString()
  @ApiProperty({
    type: String,
    example: 'Not Found',
  })
  readonly error: string;
}
