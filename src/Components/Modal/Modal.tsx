import TaskForm from '../TaskForm/TaskForm';

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  onTaskCreated?: (task: any) => void;
}

const Modal: React.FC<ModalProps> = ({ isOpen, onClose, title, onTaskCreated }) => {
  if (!isOpen) return null;

  const handleTaskCreated = async (task: any) => {
    if (onTaskCreated) {
      onTaskCreated(task);
    }
  };

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal" onClick={(e) => e.stopPropagation()}>
        <div className="modal-header">
          <h2>{title}</h2>
          <button className="modal-close" onClick={onClose}>&times;</button>
        </div>
        <div className="modal-content">
          <TaskForm onClose={onClose} onSubmit={handleTaskCreated} />
        </div>
      </div>
    </div>
  );
};

export default Modal;
