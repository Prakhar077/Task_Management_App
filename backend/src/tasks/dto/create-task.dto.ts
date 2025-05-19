import { IsEnum, IsNotEmpty, IsOptional, IsString, IsDateString } from 'class-validator';
import { TaskPriority, TaskStatus } from '../task.entity';

export class CreateTaskDto {
  @IsNotEmpty()
  @IsString()
  title: string;

  @IsNotEmpty()
  @IsString()
  description: string;

  @IsDateString()
  dueDate: string;

  @IsOptional()
  @IsEnum(TaskStatus)
  status?: TaskStatus;

  @IsOptional()
  @IsEnum(TaskPriority)
  priority?: TaskPriority;
}
