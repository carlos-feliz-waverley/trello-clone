import React from 'react';
import TaskForm from '../TaskForm/TaskForm';
import {
  Modal as MuiModal,
  Box,
  Typography,
  IconButton,
  Paper,
} from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import { styled } from '@mui/material/styles';

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  onTaskCreated?: (task: any) => void;
  children: React.ReactNode;
}

const StyledModal = styled(MuiModal)(() => ({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
}));

const ModalContent = styled(Paper)(({ theme }) => ({
  position: 'relative',
  width: 500,
  maxWidth: '90%',
  maxHeight: '90vh',
  overflow: 'auto',
  padding: theme.spacing(3),
  borderRadius: theme.shape.borderRadius,
}));

const Modal: React.FC<ModalProps> = ({ isOpen, onClose, title, onTaskCreated }) => {
  const handleTaskCreated = async (task: any) => {
    if (onTaskCreated) {
      onTaskCreated(task);
    }
  };

  return (
    <StyledModal
      open={isOpen}
      onClose={onClose}
      aria-labelledby="modal-title"
      aria-describedby="modal-description"
    >
      <ModalContent>
        <Box display="flex" justifyContent="space-between" alignItems="center" mb={2}>
          <Typography variant="h6" id="modal-title">
            {title}
          </Typography>
          <IconButton onClick={onClose} size="small">
            <CloseIcon />
          </IconButton>
        </Box>
        <TaskForm onClose={onClose} onSubmit={handleTaskCreated} />
      </ModalContent>
    </StyledModal>
  );
};

export default Modal;
