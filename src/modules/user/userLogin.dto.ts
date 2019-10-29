import { IsString, Matches, MaxLength, MinLength } from 'class-validator';

export class UserLoginDto {
  @MinLength(4, {
    message: 'Minimum length of the username is 4 characters',
  })
  @MaxLength(16, {
    message: 'Maximum length of the username is 16 characters',
  })
  @Matches(/^[a-zA-Z][a-zA-Z\-.]+$/i)
  @IsString()
  username: string;

  @MinLength(6, {
    message: 'Minimum length of the password is 6 characters',
  })
  @MaxLength(16, {
    message: 'Maximum length of the password is 16 characters',
  })
  @IsString()
  password: string;
}
