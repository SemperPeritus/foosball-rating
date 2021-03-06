import { IsNumber, IsOptional, IsString, MaxLength, MinLength } from 'class-validator';

import { UserLoginDto } from './userLogin.dto';

export class UserRegisterDto extends UserLoginDto {
  @IsOptional()
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

  @IsOptional()
  @IsNumber()
  playerWanted: number;
}
