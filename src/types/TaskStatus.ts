export const TaskStatus = {
  PENDING: 'PENDING',
  IN_PROGRESS: 'IN_PROGRESS',
  REVIEW: 'REVIEW',
  COMPLETED: 'COMPLETED'
} as const;

export type TaskStatus = typeof TaskStatus[keyof typeof TaskStatus];

export const STATUS_DISPLAY_NAMES: Record<TaskStatus, string> = {
  [TaskStatus.PENDING]: 'To Do',
  [TaskStatus.IN_PROGRESS]: 'In Progress',
  [TaskStatus.REVIEW]: 'Review',
  [TaskStatus.COMPLETED]: 'Done'
};
