import { CreateUserDto } from '../dtos/users.dtos';
import { User } from '../entities/user.entity';
import { userStub } from './user.stub';

export const usersStub = (): User[] => {
  return [userStub()];
};

export const createUserStub = (payload: CreateUserDto): User => {
  return {
    ...userStub(),
    ...payload,
  };
};

export const findOneStub = (data: any): User | boolean => {
  const users = [userStub()];
  let user: User;
  if (data.id) {
    user = users.find((item) => item.id === data.id);
    return user;
  }
  user = users.find((item) => item.email === data.where.email);
  return user ? user : false;
};
