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
  showAll(@Query('include') include: string, @Query('sort') sort: string) {
    const relations = include && include.split(',');
    const order = parseSort(sort);

    return this.userService.showAll({ relations, order });
  }

  @Get('profile')
  getCurrent(@User() user: UserEntity) {
    return user;
  }

  @Get(':id')
  read(@Param('id') id: string, @Query('include') include: string) {
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

  // TODO: Comfortable different partial for user based on roles
  @Patch(':id')
  @RequireMinimalRole(Role.MODERATOR)
  patch(@Param('id') id: string, @Body() data: Partial<UserEntity>, @User() moderator: UserEntity) {
    return this.userService.update(id, data, moderator);
  }

  @Post(':id/confirm')
  @RequireMinimalRole(Role.MODERATOR)
  confirm(@Param('id') id: string, @User() moderator: UserEntity) {
    return this.userService.confirm(id, moderator);
  }
}
