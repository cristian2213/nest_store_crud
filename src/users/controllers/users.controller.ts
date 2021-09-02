import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  ParseIntPipe,
  Post,
  Put,
  UseGuards,
} from '@nestjs/common';

import {
  ApiBearerAuth,
  ApiOperation,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import {
  CreateUserDto,
  UpdateUserDto,
  UserNotFoundResponse,
  UserToCreateErrorResponse,
} from '../dtos/users.dtos';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { Public } from 'src/auth/decorators/public.decorator';
import { DeleteUserService } from '../services/users-services/delete-user.service';
import { CreateUserService } from '../services/users-services/create-user.service';
import { FindUserService } from '../services/users-services/find-user.service';
import { UpdateUserService } from '../services/users-services/update-user.service';
import { FindUsersService } from '../services/users-services/find-users.service';

@ApiTags('users')
@UseGuards(JwtAuthGuard)
@Controller('users')
export class UsersController {
  constructor(
    private findUsersService: FindUsersService,
    private findUserService: FindUserService,
    private createUserService: CreateUserService,
    private updateUserService: UpdateUserService,
    private deleteUserService: DeleteUserService,
  ) {}

  @ApiBearerAuth()
  @ApiOperation({ summary: 'get all users' })
  @ApiResponse({ status: HttpStatus.NO_CONTENT, description: 'No Content' })
  @Get()
  @HttpCode(HttpStatus.ACCEPTED)
  getUsers() {
    return this.findUsersService.findUsers();
  }

  @ApiBearerAuth()
  @ApiOperation({ summary: 'get only an user' })
  @ApiResponse({ type: UserNotFoundResponse, status: 404 })
  @Get(':id')
  @HttpCode(HttpStatus.OK)
  getUser(@Param('id', ParseIntPipe) id: number) {
    return this.findUserService.findUser(id);
  }

  @Public()
  @ApiOperation({ summary: 'create an user' })
  @ApiResponse({
    type: UserToCreateErrorResponse,
    status: HttpStatus.UNPROCESSABLE_ENTITY,
  })
  @Post()
  @HttpCode(HttpStatus.OK)
  createUser(@Body() payload: CreateUserDto) {
    return this.createUserService.createUser(payload);
  }

  @ApiBearerAuth()
  @ApiOperation({ summary: 'update an user' })
  @ApiResponse({ type: UserNotFoundResponse, status: 404 })
  @Put(':id')
  @HttpCode(HttpStatus.OK)
  updateUser(
    @Param('id', ParseIntPipe) id: number,
    @Body() payload: UpdateUserDto,
  ) {
    return this.updateUserService.updateUser(id, payload);
  }

  @ApiBearerAuth()
  @ApiOperation({ summary: 'Delete an user' })
  @ApiResponse({ type: UserNotFoundResponse, status: 404 })
  @Delete(':id')
  @HttpCode(HttpStatus.ACCEPTED)
  deleteUser(@Param('id', ParseIntPipe) id: number) {
    return this.deleteUserService.deleteUser(id);
  }
}
