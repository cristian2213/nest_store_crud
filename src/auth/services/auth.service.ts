import {
  HttpException,
  HttpStatus,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';

import { User } from '../../users/entities/user.entity';
import { PayloadToken } from '../models/token.model';
import { LoginUserResponse } from '../dtos/auth.dtos';
import { FindUserByEmailService } from 'src/users/services/users-services/find-user-by-email.service';

@Injectable()
export class AuthService {
  constructor(
    private jwtService: JwtService,
    private findUserByEmailService: FindUserByEmailService,
  ) {}

  async validateUser(email: string, password: string): Promise<User> | never {
    const user = (await this.findUserByEmailService.findUserByEmail(
      email,
    )) as User;

    if (!user) {
      throw new NotFoundException("User doesn't exist");
    }

    const checkPassword = await bcrypt.compare(password, user.password);
    if (!checkPassword)
      throw new HttpException(
        'Forbidden, password incorrect',
        HttpStatus.FORBIDDEN,
      );
    return user;
  }

  generateJWT(user: User): LoginUserResponse {
    const { id, email } = user;
    const payload: PayloadToken = { sub: id, email };
    const token = this.jwtService.sign(payload);
    return {
      access_token: token,
      user,
    };
  }
}
