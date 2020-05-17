import { Repository, EntityRepository } from 'typeorm';
import { Task } from './task.entity';
import { CreateTaskDTO } from './dto/create-tasks.dto';
import { TaskStatus } from './task-status.enum';
import { GetTasksFilterDTO } from './dto/get-tasks-filter.dto';
import { TasksService } from './tasks.service';

@EntityRepository(Task)
export class TaskRepository extends Repository<Task> {
  async createTask(createTaskDTO: CreateTaskDTO): Promise<Task> {
    const { title, description } = createTaskDTO;
    const task = new Task();
    task.title = title;
    task.description = description;
    task.status = TaskStatus.OPEN;
    await task.save();
    return task;
  }

  async getTasks(filterDTO: GetTasksFilterDTO): Promise<Task[]> {
    const { status, search } = filterDTO;
    const query = this.createQueryBuilder('task');

    if (status) {
      query.andWhere('task.status = :status', { status });
    }

    if (search) {
      query.andWhere(
        'task.title LIKE :search OR task.description like :search ',
        { search: `%${search}%` },
      );
    }

    const tasks = await query.getMany();
    return tasks;
  }
}
