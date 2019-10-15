import { Body, Controller, Get, Param, Patch, Post, Query, UsePipes } from '@nestjs/common';

import { UserService } from './user.service';
import { UserLoginDto } from './userLogin.dto';
import { UserRegisterDto } from './userRegister.dto';
import { ValidationPipe } from '../../shared/processing/validation.pipe';
import { parseSort } from '../../shared/helpers/parseSort';
import { Role, UserEntity } from './user.entity';
import { User } from '../../shared/processing/user.decorator';
import { UserValidationPipe } from './userValidation.pipe';
import { RequireMinimalRole } from '../../shared/processing/roles.decorator';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get()
  showAllUsers(@Query('include') include: string, @Query('sort') sort: string) {
    const relations = include && include.split(',');
    const order = parseSort(sort);

    return this.userService.showAll({ relations, order });
  }

  @Get('profile')
  getCurrent(@User() user: UserEntity) {
    return user;
  }

  @Get(':id')
  readUser(@Param('id') id: string, @Query('include') include: string) {
    const relations = include && include.split(',');

    return this.userService.read(id, { relations });
  }

  @Post('login')
  @UsePipes(ValidationPipe)
  login(@Body() data: UserLoginDto) {
    return this.userService.login(data);
  }

  @Post('register')
  @UsePipes(UserValidationPipe)
  @UsePipes(ValidationPipe)
  register(@Body() data: UserRegisterDto) {
    return this.userService.register(data);
  }

  @Patch(':id')
  @RequireMinimalRole(Role.MODERATOR)
  patchUser(@Param('id') id: string, @Body() data: Partial<UserEntity>, @User() moderator: UserEntity) {
    return this.userService.patchUser(id, data, moderator);
  }
}
