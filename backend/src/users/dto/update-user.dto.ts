import { IsEnum, IsOptional, IsString } from 'class-validator';
import { Role } from '../user.entity';

export class UpdateUserDto {
  @IsString()
  @IsOptional()
  username?: string;

  @IsString()
  @IsOptional()
  password?: string;

  @IsEnum(Role)
  @IsOptional()
  role?: Role;
}
