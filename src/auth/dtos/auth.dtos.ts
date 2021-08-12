import { ApiProperty } from '@nestjs/swagger';
import { User } from 'src/users/entities/user.entity';
import { IsNumber, IsString } from 'class-validator';

export class LoginUserDto {
  @IsString()
  @ApiProperty({
    type: String,
    example: 'example@example.com',
  })
  email: string;

  @IsString()
  @ApiProperty({
    type: String,
  })
  password: User;
}

export class LoginUserResponse {
  @IsString()
  @ApiProperty({
    type: String,
    example: 'eyJhbGciOiJIUzI1...',
  })
  access_token: string;

  @ApiProperty({
    type: User,
  })
  user: User;
}

export class LoginUnauthorizedResponse {
  @IsNumber()
  @ApiProperty({
    type: Number,
    example: 401,
  })
  statusCode: number;

  @IsString()
  @ApiProperty({
    type: String,
    example: 'Unauthorized',
  })
  message: string;
}
