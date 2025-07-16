import { Droppable } from '@hello-pangea/dnd';
import Column from '../Column/Column';
import { TaskStatus } from '../../types/TaskStatus';

interface CardData {
  id: string;
  title: string;
  description: string;
}

interface ColumnData {
  id: TaskStatus;
  title: string;
  cards: Array<CardData>;
}

interface ColumnsProps {
  columns: ColumnData[];
  onCardClick: (card: CardData) => void;
}

const Columns = ({ columns, onCardClick }: ColumnsProps) => {
  return (
    <div className="grid grid-cols-4 gap-2.5 h-full">
      {columns.map((column) => (
        <Droppable droppableId={column.id} key={column.id}>
          {(provided) => (
            <div {...provided.droppableProps} ref={provided.innerRef} className="h-full">
              <Column 
                title={column.title} 
                cards={column.cards} 
                onCardClick={onCardClick} 
              />
              {provided.placeholder}
            </div>
          )}
        </Droppable>
      ))}
    </div>
  );
};

export default Columns;
