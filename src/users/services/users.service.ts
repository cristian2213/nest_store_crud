import {
  HttpException,
  HttpStatus,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcrypt';
import {
  CreateUserDto,
  UpdateUserDto,
  UserToDeleteResponse,
} from '../dtos/users.dtos';
import { User } from '../entities/user.entity';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User) private usersRepository: Repository<User>,
  ) {}

  async findAll(): Promise<User[]> | never {
    const users = await this.usersRepository.find();
    if (!users) {
      throw new HttpException('No Content', HttpStatus.NO_CONTENT);
    }

    return users;
  }

  async create(payload: CreateUserDto): Promise<User> | never {
    const { email, password } = payload;
    const user = await this.findUserByEmail(email);
    if (user) {
      throw new HttpException(
        'The user has an associated account',
        HttpStatus.UNPROCESSABLE_ENTITY,
      );
    }

    const newUser = this.usersRepository.create(payload);
    newUser.password = await bcrypt.hash(password, 10);
    return await this.usersRepository.save(newUser);
  }

  async update(id: number, payload: UpdateUserDto): Promise<User> | never {
    const userToUpdate: User = await this.findUser(id);
    if (!userToUpdate) {
      throw new NotFoundException(`User #${id} doesn't exist`);
    }
    if (payload.password) {
      payload.password = await bcrypt.hash(payload.password, 10);
    }

    this.usersRepository.merge(userToUpdate, payload);
    return await this.usersRepository.save(userToUpdate);
  }

  async findUserByEmail(email: string): Promise<boolean | User> {
    const user = await this.usersRepository.findOne({ where: { email } });
    return user ? user : false;
  }

  async findUser(id: number): Promise<User> | never {
    const user = await this.userRepo.findOne(id);
    if (!user) throw new NotFoundException(`User #${id} doesn't exist`);
    return user;
  }

  async delete(id: number): Promise<UserToDeleteResponse> {
    const user = await this.findUser(id);
    if (!user) throw new NotFoundException(`User #${id} doesn't exist`);

    await this.usersRepository.delete(user.id);
    return {
      response: `User #${user.id} was deleted`,
      status: HttpStatus.OK,
    };
  }
}
