import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcrypt';
import { User } from 'src/users/entities/user.entity';
import { CreateUserDto } from 'src/users/dtos/users.dtos';
import { FindUserByEmailService } from './find-user-by-email.service';
import { UserRepository } from '../../repositories/user-repository';

@Injectable()
export class CreateUserService extends UserRepository {
  constructor(
    public usersRepository: Repository<User>,
    private findUserByEmailService: FindUserByEmailService,
  ) {
    super(usersRepository);
  }

  async createUser(payload: CreateUserDto): Promise<User> | never {
    const { email, password } = payload;
    const user = await this.findUserByEmailService.findUserByEmail(email);
    if (user) {
      throw new HttpException(
        'The user has an associated account',
        HttpStatus.UNPROCESSABLE_ENTITY,
      );
    }

    const newUser = this.usersRepository.create(payload);
    newUser.password = await bcrypt.hash(password, 10);
    return this.usersRepository.save(newUser);
  }
}
