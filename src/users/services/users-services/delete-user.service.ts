import { HttpStatus, Injectable, NotFoundException } from '@nestjs/common';
import { Repository } from 'typeorm';
import { User } from 'src/users/entities/user.entity';
import { FindUserService } from './find-user.service';
import { UserToDeleteResponse } from 'src/users/dtos/users.dtos';
import { UserRepository } from '../../repositories/user-repository';

@Injectable()
export class DeleteUserService extends UserRepository {
  constructor(
    public usersRepository: Repository<User>,
    private findUserService: FindUserService,
  ) {
    super(usersRepository);
  }

  async deleteUser(id: number): Promise<UserToDeleteResponse> {
    const user = await this.findUserService.findUser(id);
    if (!user) throw new NotFoundException(`User #${id} doesn't exist`);

    await this.usersRepository.delete(user.id);
    return {
      response: `User #${user.id} was deleted`,
      status: HttpStatus.OK,
    };
  }
}
