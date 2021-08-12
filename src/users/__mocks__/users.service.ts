import { userStub, userUpdatedStub, userDeleteStub } from '../stubs/user.stub';

/* 
Mock: an object on which you set expectations. A mock has expectations about the way it should be called, and a test should fail if it’s not called that way. Mocks are used to test interactions between objects.
*/
export const UsersService = jest.fn().mockReturnValue({
  create: jest.fn().mockResolvedValue(userStub()),
  findAll: jest.fn().mockResolvedValue([userStub()]),
  findUser: jest.fn().mockResolvedValue(userStub()),
  update: jest
    .fn()
    .mockImplementation((id, payload) => userUpdatedStub(id, payload)),
  delete: jest.fn().mockImplementation((userId) => userDeleteStub(userId)),
});
