import React, { useState } from 'react';
import { generateClient } from 'aws-amplify/data';
import type { Schema } from '../../../amplify/data/resource';
import { Task } from '../../types/Task';
import { TaskStatus } from '../../types/TaskStatus';

const client = generateClient<Schema>();

interface TaskFormProps {
  onSubmit: (task: Task) => void;
  onClose: () => void;
  onDelete?: (taskId: string) => void;
  task?: Task | null;
}

const TaskForm: React.FC<TaskFormProps> = ({ onSubmit, onClose, onDelete, task }) => {
  const [formData, setFormData] = useState(() => {
    if (task) {
      return {
        title: task.title || '',
        description: task.description || '',
        assignee: task.assignee || '',
        status: task.status || TaskStatus.PENDING,
      };
    }
    return {
      title: '',
      description: '',
      assignee: '',
      status: TaskStatus.PENDING as TaskStatus,
    };
  });



  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validate email
    if (!formData.assignee.match(/^[^\s@]+@[^\s@]+\.[^\s@]+$/)) {
      alert('Please enter a valid email address');
      return;
    }

    try {
      let response;
      const now = new Date().toISOString();
      if (task) {
        response = await client.models.Task.update({
          id: task.id,
          title: formData.title,
          description: formData.description,
          assignee: formData.assignee,
          status: formData.status,
          createdAt: task.createdAt,
          updatedAt: now,
        });
      } else {
        response = await client.models.Task.create({
          title: formData.title,
          description: formData.description,
          assignee: formData.assignee,
          status: formData.status,
          createdAt: now,
          updatedAt: now,
        });
      }

      if (response.errors) {
        throw new Error(response.errors.map(e => e.message).join('\n'));
      }
      
      if (!response.data) {
        throw new Error(`Failed to ${task ? 'update' : 'create'} task`);
      }

      const resultTask: Task = {
        id: response.data.id,
        title: response.data.title,
        description: response.data.description || null,
        assignee: response.data.assignee,
        status: response.data.status as TaskStatus,
        createdAt: response.data.createdAt ?? undefined,
        updatedAt: response.data.updatedAt ?? undefined,
      };
      onSubmit(resultTask);
      onClose();
    } catch (error) {
      console.error(`Error ${task ? 'updating' : 'creating'} task:`, error);
    }
  };

  const handleDelete = async () => {
    if (!task || !onDelete) return;

    if (window.confirm('Are you sure you want to delete this task?')) {
      try {
        await client.models.Task.delete({ id: task.id });
        onDelete(task.id);
        onClose();
      } catch (error) {
        console.error('Error deleting task:', error);
      }
    }
  };

  return (
    <div className="p-4" data-testid="task-form">
      <h2 className="text-xl font-bold mb-4" data-testid="form-title">
        {task ? 'Edit Task' : 'Add New Task'}
      </h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label htmlFor="title" className="block text-sm font-medium text-gray-700">
            Title *
          </label>
          <input
            type="text"
            id="title"
            name="title"
            value={formData.title}
            onChange={handleChange}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 border p-2"
            required
            data-testid="title-input"
          />
        </div>

        <div>
          <label htmlFor="description" className="block text-sm font-medium text-gray-700">
            Description
          </label>
          <textarea
            id="description"
            name="description"
            value={formData.description}
            onChange={handleChange}
            rows={3}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 border p-2"
            data-testid="description-input"
          />
        </div>

        <div>
          <label htmlFor="assignee" className="block text-sm font-medium text-gray-700">
            Assignee Email *
          </label>
          <input
            type="email"
            id="assignee"
            name="assignee"
            value={formData.assignee}
            onChange={handleChange}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 border p-2"
            required
            data-testid="assignee-input"
          />
        </div>

        <div className="flex justify-end space-x-2 pt-4">
          {task && onDelete && (
            <button
              type="button"
              onClick={handleDelete}
              className="inline-flex justify-center rounded-md border border-transparent bg-red-600 px-4 py-2 text-sm font-medium text-white hover:bg-red-700 focus:outline-none focus-visible:ring-2 focus-visible:ring-red-500 focus-visible:ring-offset-2"
              data-testid="delete-button"
            >
              Delete
            </button>
          )}
          <button
            type="button"
            onClick={onClose}
            className="rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2"
            data-testid="cancel-button"
          >
            Cancel
          </button>
          <button
            type="submit"
            className="inline-flex justify-center rounded-md border border-transparent bg-blue-600 px-4 py-2 text-sm font-medium text-white hover:bg-blue-700 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2"
            data-testid="submit-button"
          >
            {task ? 'Update' : 'Create'} Task
          </button>
        </div>
      </form>
    </div>
  );
};

export default TaskForm;
