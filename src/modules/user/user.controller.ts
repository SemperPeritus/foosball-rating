import { Body, Controller, Get, Param, Post, Query, UsePipes } from '@nestjs/common';

import { UserService } from './user.service';
import { UserLoginDto } from './user-login.dto';
import { UserRegisterDto } from './user-register.dto';
import { ValidationPipe } from '../../shared/processing/validation.pipe';
import { parseSort } from '../../shared/helpers/parseSort';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get()
  showAllUsers(@Query('include') include: string, @Query('sort') sort: string) {
    const relations = include && include.split(',');
    const order = parseSort(sort);

    return this.userService.showAll({ relations, order });
  }

  @Get(':id')
  readUser(@Param('id') id: string, @Query('include') include: string) {
    const relations = include && include.split(',');

    return this.userService.read(id, { relations });
  }

  @Post('login')
  @UsePipes(new ValidationPipe())
  login(@Body() data: UserLoginDto) {
    return this.userService.login(data);
  }

  @Post('/register')
  @UsePipes(new ValidationPipe())
  register(@Body() data: UserRegisterDto) {
    return this.userService.register(data);
  }
}