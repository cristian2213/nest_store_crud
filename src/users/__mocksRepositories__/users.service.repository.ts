import { CreateUserDto } from '../dtos/users.dtos';
import { User } from '../entities/user.entity';
import {
  createUserStub,
  findOneStub,
  usersStub,
} from '../stubs/user.repository.stub';

export const mockUsersRepository = {
  find: jest.fn().mockReturnValue(usersStub()),
  findOne: jest.fn().mockImplementation((data: any) => findOneStub(data)),
  create: jest
    .fn()
    .mockImplementation((payload: CreateUserDto) => createUserStub(payload)),
  save: jest.fn().mockImplementation((user: User) => user),
};
