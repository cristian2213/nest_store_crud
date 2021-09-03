import { Injectable, NotFoundException } from '@nestjs/common';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcrypt';
import { User } from 'src/users/entities/user.entity';
import { UpdateUserDto } from 'src/users/dtos/users.dtos';
import { FindUserService } from './find-user.service';
import { UserRepository } from '../../repositories/user-repository';

@Injectable()
export class UpdateUserService extends UserRepository {
  constructor(
    public usersRepository: Repository<User>,
    private findUserService: FindUserService,
  ) {
    super(usersRepository);
  }

  async updateUser(id: number, payload: UpdateUserDto): Promise<User> | never {
    const userToUpdate: User = await this.findUserService.findUser(id);
    if (!userToUpdate) {
      throw new NotFoundException(`User #${id} doesn't exist`);
    }
    if (payload.password) {
      payload.password = await bcrypt.hash(payload.password, 10);
    }

    this.usersRepository.merge(userToUpdate, payload);
    return this.usersRepository.save(userToUpdate);
  }
}
