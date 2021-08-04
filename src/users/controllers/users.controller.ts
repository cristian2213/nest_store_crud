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
} from '@nestjs/common';

import {
  ApiNoContentResponse,
  ApiOperation,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { UsersService } from '../services/users.service';
import { CreateUserDto, UpdateUserDto } from '../dtos/users.dtos';

@ApiTags('users')
@Controller('users')
export class UsersController {
  constructor(private userService: UsersService) {}

  @Get()
  @ApiOperation({
    summary: 'get all users',
    description: 'Return a list with all users',
  })
  @ApiResponse({ status: 200, description: 'Return all records' })
  @ApiNoContentResponse({ status: 204, description: 'No Content' })
  @HttpCode(HttpStatus.OK)
  getUsers() {
    return this.userService.findAll();
  }

  @ApiOperation({
    summary: 'get only an user',
    description: 'Return an user',
  })
  @ApiResponse({ status: 200, description: 'Return an user' })
  @ApiResponse({ status: 404, description: 'No found' })
  @HttpCode(HttpStatus.OK)
  @Get(':id')
  getUser(@Param('id', ParseIntPipe) id: number) {
    return this.userService.findUser(id);
  }

  @ApiOperation({
    summary: 'create an user',
    description: 'Return the user created',
  })
  @ApiResponse({ status: 200, description: 'Return an user' })
  @ApiResponse({ status: 406, description: 'No Acceptable' })
  @HttpCode(HttpStatus.OK)
  @Post()
  createUser(@Body() payload: CreateUserDto) {
    return this.userService.create(payload);
  }

  @ApiOperation({
    summary: 'update an user',
    description: 'Update an user by id and return it',
  })
  @ApiResponse({ status: 200, description: 'User Updated' })
  @ApiResponse({ status: 404, description: 'No found' })
  @HttpCode(HttpStatus.OK)
  @Put(':id')
  updateUser(
    @Param('id', ParseIntPipe) id: number,
    @Body() payload: UpdateUserDto,
  ) {
    return this.userService.update(id, payload);
  }

  @ApiOperation({
    summary: 'Delete an user',
    description: 'Delete an user by id and return it',
  })
  @ApiResponse({ status: 202, description: 'User deleted' })
  @ApiResponse({ status: 404, description: 'No found' })
  @HttpCode(HttpStatus.ACCEPTED)
  @Delete(':id')
  deleteUser(@Param('id', ParseIntPipe) id: number) {
    return this.userService.delete(id);
  }
}
