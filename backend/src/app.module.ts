import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersModule } from './users/users.module';
import { TasksModule } from './tasks/tasks.module';
import { AuthModule } from './auth/auth.module'; // Import AuthModule here
import { User } from './users/user.entity';
import { Task } from './tasks/task.entity';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      port: 5432,
      username: 'postgres',
      password: 'Password',
      database: 'Db_Tasks',
      entities: [User, Task],
      synchronize: true,
       
    }),
    UsersModule,
    TasksModule,
    AuthModule,  // <=== add this
  ],
})
export class AppModule {}
