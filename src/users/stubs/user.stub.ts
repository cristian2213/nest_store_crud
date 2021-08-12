import { User } from '../entities/user.entity';
import { UpdateProductDto } from 'src/providers/dtos/products.dtos';
/* 
Stub: an object that provides predefined answers to method calls. A stub has no logic and only returns what you tell it to return.
*/
export const userStub = (): User => {
  return {
    id: 1,
    email: 'test@test.com',
    password: '123456',
    createdAt: new Date('09/08/2021'),
    updatedAt: new Date('09/08/2021'),
  };
};

export const userUpdatedStub = (id: number, payload: UpdateProductDto) => {
  return {
    id,
    ...userStub(),
    ...payload,
  };
};

export const userDeleteStub = (userId) => {
  return {
    messege: `User #${userId} was deleted`,
    status: 200,
  };
};
