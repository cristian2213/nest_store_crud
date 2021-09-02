import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { UsersController } from './controllers/users.controller';
import { FindUserByEmailService } from './services/users-services/find-user-by-email.service';
import { FindUsersService } from './services/users-services/find-users.service';
import { FindUserService } from './services/users-services/find-user.service';
import { CreateUserService } from './services/users-services/create-user.service';
import { UpdateUserService } from './services/users-services/update-user.service';
import { DeleteUserService } from './services/users-services/delete-user.service';

@Module({
  imports: [TypeOrmModule.forFeature([User])],
  controllers: [UsersController],
  providers: [
    FindUserByEmailService,
    FindUsersService,
    FindUserService,
    CreateUserService,
    UpdateUserService,
    DeleteUserService,
  ],
  exports: [FindUserByEmailService],
})
export class UserModule {}
