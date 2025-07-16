import { useEffect, useState } from "react";
import { DragDropContext, DropResult } from '@hello-pangea/dnd';
import { TaskStatus } from './types/TaskStatus';
import Navbar from "./Components/Navbar/Navbar";
import Columns from "./Components/Columns/Columns";
import Modal from "./Components/Modal/Modal";
import TaskForm from "./Components/TaskForm/TaskForm";
import { generateClient } from 'aws-amplify/data';
import type { Schema } from '../amplify/data/resource';
import { Task } from "./types/Task";

const client = generateClient<Schema>({
  authMode: 'apiKey',
});

function App() {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedTask, setSelectedTask] = useState<Task | null>(null);

  useEffect(() => {
    // Initialize tasks when component mounts
    const fetchTasks = async () => {
      try {
        const { data: result } = await client.models.Task.list({
          authMode: 'apiKey',
        });

        // Handle nullable fields by providing default values
        const formattedTasks = result?.map((task: any) => ({
          id: task.id,
          title: task.title || '',
          description: task.description || '',
          assignee: task.assignee || '',
          status: task.status || 'PENDING',

        })) || [];
        
        setTasks(formattedTasks);
      } catch (error) {
        console.error('Error fetching tasks:', error);
      }
    };
    fetchTasks();
  }, []);

  const handleAddTask = (task: Task) => {
    setTasks([...tasks, task]);
  };

  const handleUpdateTask = (updatedTask: Task) => {
    setTasks(tasks.map(task => (task.id === updatedTask.id ? updatedTask : task)));
  };

  const handleDeleteTask = (taskId: string) => {
    setTasks(tasks.filter(task => task.id !== taskId));
  };

  const onDragEnd = async (result: DropResult) => {
    const { destination, draggableId } = result;

    if (!destination) return;

    const task = tasks.find(t => t.id === draggableId);
    if (!task || task.status === destination.droppableId) return;

    const newStatus = destination.droppableId as TaskStatus;
    const updatedTask = { ...task, status: newStatus };

    setTasks(tasks.map(t => t.id === draggableId ? updatedTask : t));

    try {
      await client.models.Task.update({ id: draggableId, status: newStatus });
    } catch (error) {
      console.error('Failed to update task status:', error);
      // Revert state on failure
      setTasks(tasks.map(t => t.id === draggableId ? task : t));
    }
  };

  const handleCardClick = (card: any) => {
    const task = tasks.find(t => t.id === card.id);
    if (task) {
      setSelectedTask(task);
      setIsModalOpen(true);
    }
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedTask(null);
  };

  const pendingTasks = tasks.filter(task => task.status === TaskStatus.PENDING);
  const inProgressTasks = tasks.filter(task => task.status === TaskStatus.IN_PROGRESS);
  const reviewTasks = tasks.filter(task => task.status === TaskStatus.REVIEW);
  const completedTasks = tasks.filter(task => task.status === TaskStatus.COMPLETED);

  const columns = [
    { id: TaskStatus.PENDING, title: 'To Do', cards: pendingTasks.map(task => ({ id: task.id, title: task.title as string, description: task.description as string })) },
    { id: TaskStatus.IN_PROGRESS, title: 'In Progress', cards: inProgressTasks.map(task => ({ id: task.id, title: task.title as string, description: task.description as string })) },
    { id: TaskStatus.REVIEW, title: 'Review', cards: reviewTasks.map(task => ({ id: task.id, title: task.title as string, description: task.description as string })) },
    { id: TaskStatus.COMPLETED, title: 'Done', cards: completedTasks.map(task => ({ id: task.id, title: task.title as string, description: task.description as string })) },
  ];

  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <div className="flex flex-col h-screen bg-gray-100">
        <Navbar />
        <main className="flex-1 pt-20 px-4">
          <Columns onCardClick={handleCardClick} columns={columns} />
          
          <button
            onClick={() => {
              setSelectedTask(null);
              setIsModalOpen(true);
            }}
            className="fixed bottom-4 right-4 bg-blue-500 text-white p-4 rounded-full shadow-lg hover:bg-blue-600"
          >
            Add Task
          </button>

        <Modal isOpen={isModalOpen} onClose={closeModal} title={selectedTask ? 'Update Task' : 'Add New Task'}>
          <TaskForm 
            key={selectedTask ? selectedTask.id : 'new-task'}
            onSubmit={selectedTask ? handleUpdateTask : handleAddTask} 
            onClose={closeModal} 
            onDelete={handleDeleteTask}
            task={selectedTask} 
          />
        </Modal>
      </main>
    </div>
   </DragDropContext>
  );
}

export default App;
