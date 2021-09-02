import { Injectable, NotFoundException } from '@nestjs/common';
import { Repository } from 'typeorm';
import { User } from 'src/users/entities/user.entity';
import { UserRepository } from '../../repositories/user-repository';

@Injectable()
export class FindUserService extends UserRepository {
  constructor(public usersRepository: Repository<User>) {
    super(usersRepository);
  }

  async findUser(id: number): Promise<User> | never {
    const user = await this.usersRepository.findOne(id);
    if (!user) throw new NotFoundException(`User #${id} doesn't exist`);
    return user;
  }
}
