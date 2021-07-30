import { IsNotEmpty, IsString, Length } from 'class-validator';
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
