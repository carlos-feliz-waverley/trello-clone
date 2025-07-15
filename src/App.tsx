import { useEffect, useState } from "react";
import type { Schema } from "../amplify/data/resource";
import { generateClient } from "aws-amplify/data";
import Navbar from "./Components/Navbar/Navbar";
import Columns from "./Components/Columns/Columns";
import Modal from "./Components/Modal/Modal";

const client = generateClient<Schema>();

function App() {
  const [tasks, setTasks] = useState<Array<Schema["Task"]["type"]>>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    client.models.Task.observeQuery().subscribe({
      next: (data) => setTasks([...data.items]),
    });
  }, []);

  const handleTaskCreated = (task: Schema["Task"]["type"]) => {
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
