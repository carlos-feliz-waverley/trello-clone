import React, { useState } from 'react';
import { generateClient } from 'aws-amplify/data';
import type { Schema } from '../../../amplify/data/resource';
import { Task } from '../../types/Task';

const client = generateClient<Schema>({
  authMode: 'apiKey',
});

interface TaskFormProps {
  onClose: () => void;
  onSubmit: (task: Task) => void;
}

const TaskForm: React.FC<TaskFormProps> = ({ onClose, onSubmit }) => {
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    assignee: '',
    status: 'IN_PROGRESS'
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
      const response = await client.models.Task.create({
        title: formData.title,
        description: formData.description || null,
        assignee: formData.assignee,
        status: formData.status,
        createdAt: Date.now(),
      });
      
      if (!response.data) {
        throw new Error('Failed to create task - no data returned');
      }
      
      const task: Task = {
        id: response.data.id,
        title: response.data.title,
        description: response.data.description || null,
        assignee: response.data.assignee,
        status: response.data.status,
        createdAt: response.data.createdAt?.toString() || null,
        updatedAt: response.data.updatedAt?.toString() || null,
      };
      onSubmit(task);
      onClose();
    } catch (error) {
      console.error('Error creating task:', error);
      if (error instanceof Error) {
        alert(`Failed to create task: ${error.message}`);
      } else {
        alert('Failed to create task. Please try again.');
      }
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label htmlFor="title" className="block text-sm font-medium text-gray-700">
          Title
        </label>
        <input
          type="text"
          id="title"
          name="title"
          value={formData.title}
          onChange={handleChange}
          required
          className="mt-1 h-10 p-4 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
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
          rows={13}
          required
          className="mt-1 h-28 p-4 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
        />
      </div>

      <div>
        <label htmlFor="assignee" className="block text-sm font-medium text-gray-700">
          Assignee (Email)
        </label>
        <input
          type="email"
          id="assignee"
          name="assignee"
          value={formData.assignee}
          onChange={handleChange}
          required
          className="mt-1 h-10 p-4 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
        />
      </div>

      <div className="flex justify-end space-x-2">
        <button
          type="button"
          onClick={onClose}
          className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50"
        >
          Cancel
        </button>
        <button
          type="submit"
          className="px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-md hover:bg-blue-700"
        >
          Save
        </button>
      </div>
    </form>
  );
};

export default TaskForm;
