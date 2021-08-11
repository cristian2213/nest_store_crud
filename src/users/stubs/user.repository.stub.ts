import { CreateUserDto } from '../dtos/users.dtos';
import { User } from '../entities/user.entity';
import { userStub } from './user.stub';

// eslint-disable-next-line prefer-const
export let state = {
  err: false,
};

export const mutationState = (key: string, value: boolean) => {
  const result = (state[key] = value);
  return result;
};

export const usersStub = (): User[] => {
  if (state.err) return [];
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
  if (typeof data === 'number') {
    user = users.find((item) => item.id === data);
    return user;
  }
  user = users.find((item) => item.email === data.where.email);
  return user ? user : false;
};

export const deleteUserStub = (id: number) => {
  return {
    response: `User #${id} was deleted`,
    status: 200,
  };
};
