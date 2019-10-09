import { IsOptional, IsString, MaxLength, MinLength } from 'class-validator';

import { UserLoginDto } from './user-login.dto';

export class UserRegisterDto extends UserLoginDto {
  @MinLength(1, {
    message: 'Please, enter name',
  })
  @MaxLength(32, {
    message: 'Too long name',
  })
  @IsString()
  firstName: string;

  @IsOptional()
  @IsString()
  secondName: string;
}
