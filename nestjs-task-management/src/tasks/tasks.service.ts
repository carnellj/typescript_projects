import { Injectable, NotFoundException } from '@nestjs/common';
import { TaskStatus } from './task-status.enum';
import { CreateTaskDTO } from './dto/create-tasks.dto';
import { GetTasksFilterDTO } from './dto/get-tasks-filter.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { TaskRepository } from './task.repository';
import { Task } from './task.entity';
import { TasksModule } from './tasks.module';

@Injectable()
export class TasksService {
  constructor(
    @InjectRepository(TaskRepository) private taskRepository: TaskRepository,
  ) {}

  async getTasks(filterDTO: GetTasksFilterDTO): Promise<Task[]> {
    const tasks = await this.taskRepository.getTasks(filterDTO);
    return tasks;
  }

  async createTask(createTaskDTO: CreateTaskDTO): Promise<Task> {
    return this.taskRepository.save(createTaskDTO);
  }

  async getTaskById(id: number): Promise<Task> {
    const found = await this.taskRepository.findOne(id);
    if (found) {
      return found;
    } else {
      throw new NotFoundException(`Task with ${id} not found`);
    }
  }

  async deleteTaskById(id: number): Promise<void> {
    const result = await this.taskRepository.delete(id);

    if (result.affected === 0) {
      throw new NotFoundException(`Task by id ${id} not found`);
    }
  }

  async updateTaskById(id: number, status: TaskStatus): Promise<Task> {
    const task = await this.getTaskById(id);
    task.status = status;
    await task.save();
    return task;
  }
}
