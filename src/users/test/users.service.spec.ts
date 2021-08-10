import { HttpException } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateUserDto } from '../dtos/users.dtos';
import { User } from '../entities/user.entity';
import { UsersService } from '../services/users.service';
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
      beforeEach(async () => {
        users = await usersService.findAll();
      });

      test('then it should call repository find method', () => {
        expect(usersRepository.find).toBeCalled();
      });

      test('then it should return the array of users', () => {
        expect(Array.isArray(users)).toBe(true);
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
    });
  });
});
