export interface Task {
  id: string;
  title: string | null;
  description: string | null;
  assignee: string | null;
  status: string | null;
  createdAt: string | null;
  updatedAt: string | null;
}
