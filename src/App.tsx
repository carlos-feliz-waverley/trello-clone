import { useEffect, useState } from "react";
import Navbar from "./Components/Navbar/Navbar";
import Columns from "./Components/Columns/Columns";
import Modal from "./Components/Modal/Modal";
import { generateClient } from 'aws-amplify/data';
import type { Schema } from '../amplify/data/resource';


const client = generateClient<Schema>({
  authMode: 'apiKey',
});

interface Task {
  id: string;
  title: string;
  description: string;
  assignee: string;
  status: 'PENDING' | 'IN_PROGRESS' | 'COMPLETED' | 'REVIEW';
  createdAt: string;
}

function App() {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    // Initialize tasks when component mounts
    const fetchTasks = async () => {
      try {
        const { data: result } = await client.models.Task.list({
          authMode: 'apiKey',
        });

        console.log(result);
        
        // Handle nullable fields by providing default values
        const formattedTasks = result?.map((task: any) => ({
          id: task.id,
          title: task.title || '',
          description: task.description || '',
          assignee: task.assignee || '',
          status: task.status || 'PENDING',
          createdAt: task.createdAt?.toString() || new Date().toISOString()
        })) || [];
        
        setTasks(formattedTasks);
      } catch (error) {
        console.error('Error fetching tasks:', error);
      }
    };
    fetchTasks();
  }, []);

  const handleTaskCreated = (task: Task) => {
    setTasks(prev => [...prev, task]);
  };

  return (
    <div className="bg-slate-100 min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-1 pt-20 px-4">
        <Columns columns={[
          {
            id: '1',
            title: 'To Do',
            cards: tasks.filter(task => task.status === 'PENDING').map(task => ({
              id: task.id,
              title: task.title,
              description: task.description
            }))
          },
          {
            id: '2',
            title: 'In Progress',
            cards: tasks.filter(task => task.status === 'IN_PROGRESS').map(task => ({
              id: task.id,
              title: task.title,
              description: task.description
            }))
          },
          {
            id: '3',
            title: 'Review',
            cards: []
          },
          {
            id: '4',
            title: 'Done',
            cards: tasks.filter(task => task.status === 'COMPLETED').map(task => ({
              id: task.id,
              title: task.title,
              description: task.description
            }))
          }
        ]} />
        <button
          className="fixed bottom-4 right-4 bg-blue-600 text-white px-4 py-2 rounded-full shadow-lg hover:bg-blue-700"
          onClick={() => setIsModalOpen(true)}
        >
          + Add Task
        </button>
        <Modal
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          title="Add New Task"
          onTaskCreated={handleTaskCreated}
        />
      </main>
    </div>
  );
}

export default App;
