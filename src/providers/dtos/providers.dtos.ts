import { IsNotEmpty, IsString, Length } from 'class-validator';
import { PartialType } from '@nestjs/mapped-types';
export class CreateProviderDto {
  @IsString()
  @IsNotEmpty()
  @Length(1, 150)
  readonly name: string;
}

export class UpdateProviderDto extends PartialType(CreateProviderDto) {}
