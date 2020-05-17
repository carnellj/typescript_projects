import { TaskStatus } from '../task-status.enum';
import { IsOptional, IsIn, IsNotEmpty } from 'class-validator';
import { TaskStatusValidationPipe } from '../pipes/task-status-validation.pipe';

export class GetTasksFilterDTO {
  @IsOptional()
  @IsIn([TaskStatus.OPEN, TaskStatus.IN_PROGRESS, TaskStatus.DONE])
  status: TaskStatus;

  @IsOptional()
  @IsNotEmpty()
  search: string;
}
