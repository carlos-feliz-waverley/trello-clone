import { TaskStatus } from './TaskStatus';

export interface Task {
  id: string;
  title: string | null;
  description: string | null;
  assignee: string | null;
  status: TaskStatus | null;
  createdAt?: string;
  updatedAt?: string;
}
