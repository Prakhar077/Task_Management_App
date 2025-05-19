import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Body,
  Param,
  Req,
  UseGuards,
  ParseIntPipe,
} from '@nestjs/common';
import { TasksService } from './tasks.service';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';

@Controller('tasks')
@UseGuards(JwtAuthGuard) // Protect all routes with JWT auth guard
export class TasksController {
  constructor(private readonly tasksService: TasksService) {}

  @Get()
  getTasks(@Req() req) {
    return this.tasksService.findAll(req.user);
  }

  @Get(':id')
  getTask(@Param('id', ParseIntPipe) id: number, @Req() req) {
    return this.tasksService.findOne(id, req.user);
  }

 @Post()
  create(@Body() createTaskDto: CreateTaskDto, @Req() req) {
    return this.tasksService.create(createTaskDto, req.user); // ✅ Inject user into create()
  }

  @Put(':id')
  updateTask(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateTaskDto: UpdateTaskDto,
    @Req() req,
  ) {
    return this.tasksService.update(id, updateTaskDto, req.user);
  }

  @Delete(':id')
  deleteTask(@Param('id', ParseIntPipe) id: number, @Req() req) {
    return this.tasksService.remove(id, req.user);
  }
}
