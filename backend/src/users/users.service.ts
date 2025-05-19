import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcrypt';  // import bcrypt
import { User } from './user.entity';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private usersRepository: Repository<User>,
  ) {}

  async create(createUserDto: CreateUserDto): Promise<User> {
    // Hash the password before creating the user entity
    const hashedPassword = await bcrypt.hash(createUserDto.password, 10);

    const user = this.usersRepository.create({
      ...createUserDto,
      password: hashedPassword,
    });

    return this.usersRepository.save(user);
  }

  async findAll(): Promise<User[]> {
    return this.usersRepository.find({ relations: ['tasks'] });
  }

  async findOne(id: number): Promise<User> {
    const user = await this.usersRepository.findOne({
      where: { id },
      relations: ['tasks'],
    });
    if (!user) throw new NotFoundException('User not found');
    return user;
  }

async findOneByUsername(username: string): Promise<User> {
  const user = await this.usersRepository.findOne({
    where: { username },
    select: ['id', 'username', 'password', 'role'], // explicitly select role
  });

  if (!user) {
    throw new NotFoundException(`User with username "${username}" not found`);
  }

  return user;
}


  async update(id: number, updateUserDto: UpdateUserDto): Promise<User> {
    // If password is present in update, hash it before updating
    if (updateUserDto.password) {
      updateUserDto.password = await bcrypt.hash(updateUserDto.password, 10);
    }
    await this.usersRepository.update(id, updateUserDto);
    return this.findOne(id);
  }

  async remove(id: number): Promise<void> {
    await this.usersRepository.delete(id);
  }
}
