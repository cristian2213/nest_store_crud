import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { User } from 'src/users/entities/user.entity';
import { Repository } from 'typeorm';
import { UserRepository } from '../../repositories/user-repository';

@Injectable()
export class FindUsersService extends UserRepository {
  constructor(public usersRepository: Repository<User>) {
    super(usersRepository);
  }

  async findUsers(): Promise<User[]> | never {
    const users = await this.usersRepository.find();
    if (!users) {
      throw new HttpException('No Content', HttpStatus.NO_CONTENT);
    }
    return users;
  }
}
