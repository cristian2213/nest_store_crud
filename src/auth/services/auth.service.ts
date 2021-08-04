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
import { UsersService } from 'src/users/services/users.service';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
  ) {}

  async validateUser(email: string, password: string): Promise<User> | never {
    const user = (await this.usersService.findUserByEmail(email)) as User;

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

  generateJWT(user: User) {
    const { id, email } = user;
    const payload: PayloadToken = { sub: id, email };
    const token = this.jwtService.sign(payload);
    return {
      access_token: token,
      user,
    };
  }
}
