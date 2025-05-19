import { Injectable, NotFoundException, ForbiddenException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Task } from './task.entity';
import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';
import { User, Role } from '../users/user.entity';

@Injectable()
export class TasksService {
  constructor(
    @InjectRepository(Task)
    private tasksRepository: Repository<Task>,
  ) {}

  async create(createTaskDto: CreateTaskDto, user: User): Promise<Task> {
    const task = this.tasksRepository.create({
      ...createTaskDto,
      user: { id: user.id }, // ✅ Associate user by ID
    });
    return this.tasksRepository.save(task);
  }

  async findAll(user: User): Promise<any[]> {
  const tasks = await this.tasksRepository.find({
    relations: ['user'], // include the user relation
    where: user.role === Role.ADMIN ? {} : { user: { id: user.id } },
  });

  return tasks.map((task) => ({
    id: task.id,
    title: task.title,
    description: task.description,
    status: task.status,
    dueDate: task.dueDate,
    priority: task.priority,
    user: {
      username: task.user?.username || '',
    },
  }));
}


  async findOne(id: number, user: User): Promise<Task> {
    const task = await this.tasksRepository.findOne({ where: { id }, relations: ['user'] });
    if (!task) throw new NotFoundException('Task not found');

    if (user.role !== Role.ADMIN && task.user.id !== user.id) {
      throw new ForbiddenException('Access denied');
    }

    return task;
  }

  async update(id: number, updateTaskDto: UpdateTaskDto, user: User): Promise<Task> {
    const task = await this.findOne(id, user);
    Object.assign(task, updateTaskDto);
    return this.tasksRepository.save(task);
  }

  async remove(id: number, user: User): Promise<void> {
    const task = await this.findOne(id, user);
    await this.tasksRepository.delete(task.id);
  }
}
