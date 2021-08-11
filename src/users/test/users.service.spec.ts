import { HttpException, NotFoundException } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateUserDto, UpdateUserDto } from '../dtos/users.dtos';
import { User } from '../entities/user.entity';
import { UsersService } from '../services/users.service';
import { mutationState } from '../stubs/user.repository.stub';
import { userStub } from '../stubs/user.stub';
import { mockUsersRepository } from '../__mocksRepositories__/users.service.repository';

describe('UsersService', () => {
  let usersService: UsersService;
  let usersRepository: Repository<User>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        UsersService,
        {
          provide: getRepositoryToken(User),
          useValue: mockUsersRepository,
        },
      ],
    }).compile();

    usersService = module.get<UsersService>(UsersService);
    usersRepository = module.get(getRepositoryToken(User));
  });

  describe('findAll', () => {
    describe('when findAll is called', () => {
      let users: User[];
      let usersArray: User[];

      beforeEach(async () => {
        users = await usersService.findAll();
        usersArray = [userStub()];
      });

      test('then it should call repository find method', () => {
        expect(usersRepository.find).toBeCalled();
      });

      test('then it should return the array of users', () => {
        expect(Array.isArray(users)).toBe(true);
        expect(users).toEqual(usersArray);
      });

      test('then it should return a HttpException if the users do not exist', async () => {
        await mutationState('err', true);

        setTimeout(async () => {
          try {
            await usersService.findAll();
          } catch (error) {
            expect(error).toBeInstanceOf(HttpException);
            expect(error.message).toBe('No Content');
          }
        }, 200);
      });
    });
  });

  describe('create', () => {
    describe('when create is called', () => {
      test("then it shouldn't create a user", async () => {
        expect.assertions(2);
        try {
          await usersService.create(userStub());
        } catch (error) {
          expect(error).toBeInstanceOf(HttpException);
          expect(error.message).toBe('The user has an associated account');
        }
      });

      test('then it should create a new user', async () => {
        const payload: CreateUserDto = {
          email: 'test_@test.com',
          password: userStub().password,
        };
        const user = await usersService.create(payload);
        expect(Object.values(user).length).toBeGreaterThan(2);
        expect(user.password.length).toBeGreaterThan(
          userStub().password.length,
        ); // Check if the password was encrypted
      });

      test('then it should call findOne method', () => {
        expect(usersRepository.findOne).toBeCalledWith({
          where: { email: userStub().email },
        });
      });
    });
  });

  describe('update', () => {
    describe('when update is called', () => {
      let newUser: UpdateUserDto;
      let userId: number;

      beforeEach(async () => {
        const { id, email, password } = userStub();
        userId = id + 1;
        newUser = {
          email,
          password,
        };
      });

      test("then it shouldn't update a user", async () => {
        expect.assertions(2);
        try {
          await usersService.update(userId, newUser);
        } catch (error) {
          expect(error).toBeInstanceOf(NotFoundException);
          expect(error.message).toBe("The user to research doesn't exist");
        }
      });

      test('then it should call findOne method', () => {
        expect(usersRepository.findOne).toBeCalledWith(userId);
      });
    });
  });

  describe('findUserByEmail', () => {
    describe('when findUserByEmail is called', () => {
      let user: User | boolean;
      let userTwo: User | boolean;
      let userEmail: string;
      let userEmailTwo: string;

      beforeEach(async () => {
        userEmail = 'test_@test.com';
        userEmailTwo = userStub().email;
        user = await usersService.findUserByEmail(userEmail);
        userTwo = await usersService.findUserByEmail(userEmailTwo);
      });

      test("then it shouldn't retun a user by email", () => {
        expect(user).toBe(false);
      });

      test('then it should return a user by email', () => {
        expect(userTwo).toEqual(userStub());
      });

      test('then it should call findOne method', () => {
        expect(usersRepository.findOne).toBeCalledWith({
          where: { email: userEmail },
        });
      });
    });
  });

  describe('findUser', () => {
    describe('when findUser is called', () => {
      let user: User | boolean;

      beforeEach(async () => {
        user = await usersService.findUser(userStub().id);
      });

      test("then it shouldn't find a user by id", async () => {
        expect.assertions(2);
        try {
          await usersService.findUser(2);
        } catch (error) {
          expect(error).toBeInstanceOf(NotFoundException);
          expect(error.message).toBe("The user to research doesn't exist");
        }
      });

      test('then it should return a user by id', () => {
        expect(user).toEqual(userStub());
      });

      test('then it should call findOne method', () => {
        expect(usersRepository.findOne).toBeCalledWith(userStub().id);
      });
    });
  });

  describe('delete', () => {
    describe('when delete is called', () => {
      let userToSearch: User | boolean;
      let userToDelete;

      beforeEach(async () => {
        userToSearch = await usersService.findUser(userStub().id);
        userToDelete = await usersService.delete(userStub().id);
      });

      test("then it shouldn't find a user by id", async () => {
        expect.assertions(2);
        try {
          await usersService.findUser(2);
        } catch (error) {
          expect(error).toBeInstanceOf(NotFoundException);
          if (error.message === "The user to research doesn't exist")
            expect(error.message).toBe("The user to research doesn't exist");
          else expect(error.message).toBe("The user to delete doesn't exist");
        }
      });

      test('then it should return a user by id', () => {
        expect(userToSearch).toEqual(userStub());
      });

      test('then it should call findOne method', () => {
        expect(usersRepository.findOne).toBeCalledWith(userStub().id);
      });

      test('then it should delete the user', () => {
        expect(userToDelete.status).toBe(200);
        expect(userToDelete.response).toBe(
          `User #${userStub().id} was deleted`,
        );
      });
    });
  });
});
