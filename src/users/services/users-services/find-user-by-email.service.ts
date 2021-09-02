import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { User } from 'src/users/entities/user.entity';
import { UserRepository } from '../../repositories/user-repository';

@Injectable()
export class FindUserByEmailService extends UserRepository {
  constructor(public usersRepository: Repository<User>) {
    super(usersRepository);
  }

  async findUserByEmail(email: string): Promise<boolean | User> {
    const user = await this.usersRepository.findOne({ where: { email } });
    return user ? user : false;
  }
}
