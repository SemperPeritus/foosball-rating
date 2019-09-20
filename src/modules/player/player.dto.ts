import { IsString } from 'class-validator';

export class PlayerDto {
  @IsString()
  name: string;
}
