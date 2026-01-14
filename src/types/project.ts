//types//project.ts//


export type Priority = 'Low' | 'Medium' | 'High';
export type Status = 'Planned' | 'In Progress' | 'Completed' | 'On Hold' | 'At Risk' | 'Delayed';

export interface Reminder {
  id: string;
  date: string;
  description: string;
}

export interface Task {
  id: string;
  name: string;
  description?: string;
  assignedTo: string;
  status: 'Todo' | 'In Progress' | 'Done';
}

export interface Project {
  id: string;
  name: string;
  description: string;
  type: string;
  startDate: string;
  endDate: string;
  manager: string;
  assignees: string[];
  status: Status;
  priority: Priority;
  tasks: Task[];
  reminders: Reminder[];
}