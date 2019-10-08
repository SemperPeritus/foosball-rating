import { IsString, MaxLength, MinLength } from 'class-validator';

export class PlayerDto {
  @MinLength(1, {
    message: 'Please, enter name',
  })
  @MaxLength(32, {
    message: 'Too long name',
  })
  @IsString()
  name: string;
}
