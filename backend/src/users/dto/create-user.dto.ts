import { IsEnum, IsNotEmpty, IsString } from 'class-validator';
import { Role } from '../user.entity';

export class CreateUserDto {
  @IsString()
  @IsNotEmpty()
  username: string;

  @IsString()
  @IsNotEmpty()
  password: string;

  @IsEnum(Role)
  role: Role;
}
