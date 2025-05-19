import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import axiosInstance from '../api/axios';
import useAuth from '../hooks/useAuth';
import type { Task } from '@/types';

const schema = yup.object().shape({
  title: yup.string().required('Title is required'),
  description: yup.string().required('Description is required'),
  dueDate: yup.string().required('Due date is required'),
  priority: yup.string().oneOf(['Low', 'Medium', 'High']).required(),
  status: yup.string().oneOf(['Pending', 'In Progress', 'Completed']).required(),
});

const Tasks: React.FC = () => {
  const { token , user} = useAuth();
  const [tasks, setTasks] = useState<Task[]>([]);
  const [editingTaskId, setEditingTaskId] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    reset,
    setValue,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
    defaultValues: {
      title: '',
      description: '',
      dueDate: '',
      priority: 'Medium',
      status: 'Pending',
    },
  });

  const fetchTasks = async () => {
    try {
      const res = await axiosInstance.get('/tasks', {
        headers: { Authorization: `Bearer ${token}` },
      });
      setTasks(res.data);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchTasks();
  }, []);

  const onSubmit = async (data: any) => {
    try {
      if (editingTaskId) {
        await axiosInstance.put(`/tasks/${editingTaskId}`, data, {
          headers: { Authorization: `Bearer ${token}` },
        });
      } else {
        await axiosInstance.post('/tasks', data, {
          headers: { Authorization: `Bearer ${token}` },
        });
      }
      resetForm();
      fetchTasks();
    } catch (error) {
      console.error(error);
    }
  };

  const resetForm = () => {
    setEditingTaskId(null);
    reset();
  };

  const handleEditTask = (task: Task) => {
    setEditingTaskId(task.id);
    setValue('title', task.title);
    setValue('description', task.description);
    setValue('dueDate', task.dueDate?.slice(0, 10));
    setValue('priority', task.priority);
    setValue('status', task.status);
  };

  const handleDeleteTask = async (id: string) => {
    try {
      await axiosInstance.delete(`/tasks/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      fetchTasks();
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="p-6 max-w-2xl mx-auto">
      <h1 className="text-2xl font-bold mb-4">{editingTaskId ? 'Edit Task' : 'Add Task'}</h1>
      <form onSubmit={handleSubmit(onSubmit)} className="mb-4 flex flex-col gap-2">
        <input
          className="border p-2 rounded"
          placeholder="Title"
          {...register('title')}
        />
        {errors.title && <span className="text-red-500 text-sm">{errors.title.message}</span>}

        <textarea
          className="border p-2 rounded"
          placeholder="Description"
          {...register('description')}
        />
        {errors.description && <span className="text-red-500 text-sm">{errors.description.message}</span>}

        <input
          type="date"
          className="border p-2 rounded"
          {...register('dueDate')}
        />
        {errors.dueDate && <span className="text-red-500 text-sm">{errors.dueDate.message}</span>}

        <select className="border p-2 rounded" {...register('priority')}>
          <option value="Low">Low</option>
          <option value="Medium">Medium</option>
          <option value="High">High</option>
        </select>
        {errors.priority && <span className="text-red-500 text-sm">{errors.priority.message}</span>}

        <select className="border p-2 rounded" {...register('status')}>
          <option value="Pending">Pending</option>
          <option value="In Progress">In Progress</option>
          <option value="Completed">Completed</option>
        </select>
        {errors.status && <span className="text-red-500 text-sm">{errors.status.message}</span>}

        <div className="flex gap-2">
          <button
            type="submit"
            className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
          >
            {editingTaskId ? 'Update Task' : 'Add Task'}
          </button>
          {editingTaskId && (
            <button type="button" onClick={resetForm} className="bg-gray-400 text-white px-4 py-2 rounded">
              Cancel
            </button>
          )}
        </div>
      </form>

      <ul>
        {tasks.map((task) => (
          <li key={task.id} className="border-b py-3 flex justify-between items-start">
            <div>
              <h3 className="font-semibold">{task.title}</h3>
              <p className="text-sm text-gray-700">{task.description}</p>
              <p className="text-sm mt-1">Due: {task.dueDate?.slice(0, 10)}</p>
              <p className="text-sm">Priority: {task.priority}</p>
              <p className="text-sm">Status: {task.status}</p>
              {user?.role === 'admin' && task.user && (
  <p className="text-sm text-gray-700">
    Assigned to: <span className="font-semibold">{task.user.username}</span>
  </p>
)}

            </div>
            <div className="flex gap-2">
              <button
                onClick={() => handleEditTask(task)}
                className="text-blue-600 hover:text-blue-800"
              >
                Edit
              </button>
              <button
                onClick={() => handleDeleteTask(task.id)}
                className="text-red-600 hover:text-red-800"
              >
                Delete
              </button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Tasks;
