import { Test, TestingModule } from '@nestjs/testing';
import { UsersController } from '../controllers/users.controller';
import { UsersService } from '../services/users.service';
import { User } from '../entities/user.entity';
import { userStub } from '../stubs/user.stub';
import { UsersService as MockUsersService } from '../__mocks__/users.service';
import { UpdateUserDto } from '../dtos/users.dtos';

describe('UsersController', () => {
  let usersController: UsersController;
  let usersService: UsersService;

  beforeEach(async () => {
    // create a module for testing
    const app: TestingModule = await Test.createTestingModule({
      imports: [],
      controllers: [UsersController],
      providers: [UsersService],
    })
      .overrideProvider(UsersService)
      .useClass(MockUsersService)
      .compile();

    // get of intance to testing
    usersController = app.get<UsersController>(UsersController);
    usersService = app.get<UsersService>(UsersService);
    jest.clearAllMocks();
  });

  describe('createUser', () => {
    describe('when createUser is called', () => {
      let user: User;

      beforeEach(async () => {
        user = await usersController.createUser(userStub());
      });

      test('then it should call create method from usersService', () => {
        expect(usersService.create).toBeCalledWith(userStub());
      });

      test('then it should return a user', () => {
        expect(user).toEqual(userStub());
      });
    });
  });

  describe('getUsers', () => {
    describe('when getUsers is called', () => {
      let users: User[];

      beforeEach(async () => {
        users = await usersController.getUsers();
      });

      test('then it should call findAll method from usersService', () => {
        expect(usersService.findAll).toBeCalled();
      });

      test('then it should return a users array', () => {
        expect(users).toEqual([userStub()]);
      });
    });
  });

  describe('getUser', () => {
    describe('when getUser is called', () => {
      let user: User;

      beforeEach(async () => {
        user = await usersController.getUser(userStub().id);
      });

      test('then it should call findUser method from usersService', () => {
        expect(usersService.findUser).toBeCalledWith(userStub().id);
      });

      test('then it should return a user', () => {
        expect(user).toEqual(userStub());
      });

      test('then it should have a length greater than zero', () => {
        expect(Object.values(user).length).toBeGreaterThan(0);
      });
    });
  });

  describe('updateUser', () => {
    describe('when updateUser is called', () => {
      let user: User = userStub();
      const payload: UpdateUserDto = {
        email: 'email_edited@test.com',
        password: user.password,
      };
      beforeEach(async () => {
        user = await usersController.updateUser(user.id, payload);
      });

      test('then it should call update method from usersService', () => {
        expect(usersService.update).toBeCalledWith(user.id, payload);
      });

      test('then it should return the user updated', () => {
        expect(user).toEqual({ id: user.id, ...user, ...payload });
      });
    });
  });

  describe('deleteUser', () => {
    describe('when deleteUser is called', () => {
      let userDeleted;
      const userId: number = userStub().id;

      beforeEach(async () => {
        userDeleted = await usersController.deleteUser(userId);
      });

      test('then it should call delete method from usersService', () => {
        expect(usersService.delete).toBeCalledWith(userId);
      });

      test('then it should return an object with two properties', () => {
        expect(userDeleted.messege).toMatch(`User #${userId} was deleted`);
        expect(userDeleted.status).toBe(200);
      });
    });
  });
});
