import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from 'src/users/entities/user.entity';

export class UserRepository {
  constructor(
    @InjectRepository(User) public usersRepository: Repository<User>,
  ) {}
}
