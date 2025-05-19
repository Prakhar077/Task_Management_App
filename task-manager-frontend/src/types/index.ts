// src/types/index.ts
// src/types/index.ts
export type Task = {
  id: string;
  title: string;
  description: string;
  dueDate: string;
  priority: 'Low' | 'Medium' | 'High';
  status: 'Pending' | 'In Progress' | 'Completed';
  user?: {
    username: string;
  };
};



export type User = {
  id: number;
  name: string;
  email: string;
  role: 'Admin' | 'User';
  createdAt: string;
  updatedAt: string;
};

