import {
  IsEmail,
  IsNotEmpty,
  IsNumber,
  IsString,
  MaxLength,
} from 'class-validator';
import { PartialType, ApiProperty } from '@nestjs/swagger';

export class CreateUserDto {
  @IsEmail()
  @IsNotEmpty()
  @MaxLength(150)
  @ApiProperty({
    required: true,
    type: String,
    description: 'user email',
    example: 'example@gmail.com',
    maxLength: 150,
    nullable: false,
  })
  email: string;

  @IsString()
  @IsNotEmpty()
  @MaxLength(100)
  @ApiProperty({
    required: true,
    type: String,
    description: 'user password',
    example: 'example1',
    minLength: 6,
    maxLength: 100,
    nullable: false,
  })
  password: string;
}

export class UpdateUserDto extends PartialType(CreateUserDto) {}
export class UserNotFoundResponse {
  @IsNumber()
  @ApiProperty({
    type: Number,
    example: 404,
  })
  readonly statusCode: number;

  @IsString()
  @ApiProperty({
    type: String,
    example: "User #1 doesn't exist",
  })
  readonly message: string;

  @IsString()
  @ApiProperty({
    type: String,
    example: 'Not Found',
  })
  readonly error: string;
}

export class UserToDeleteResponse {
  @IsString()
  @ApiProperty({
    type: String,
    example: 'User #1 was deleted',
  })
  readonly response: string;

  @IsNumber()
  @ApiProperty({
    type: Number,
    example: 200,
  })
  readonly status: number;
}

export class UserToCreateErrorResponse {
  @IsNumber()
  @ApiProperty({
    type: Number,
    example: 422,
  })
  readonly statusCode: number;

  @IsString()
  @ApiProperty({
    type: String,
    example: 'The user has an associated account',
  })
  readonly message: string;
}
