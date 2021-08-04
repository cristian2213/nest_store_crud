import { IsEmail, IsNotEmpty, IsString, MaxLength } from 'class-validator';
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
