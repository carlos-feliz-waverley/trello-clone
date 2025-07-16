import { Draggable } from '@hello-pangea/dnd';
import Card from '../Card/Card';

interface CardData {
  id: string;
  title: string;
  description: string;
}

interface ColumnProps {
  title: string;
  cards: Array<CardData>;
  onCardClick: (card: CardData) => void;
}

const Column = ({ title, cards, onCardClick }: ColumnProps) => {
  return (
    <div className="bg-white rounded-lg h-full p-4" data-testid={`column-${title.toLowerCase().replace(/\s+/g, '-')}`}>
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-lg font-semibold">{title}</h2>
      </div>
      <div className="space-y-2" data-testid="cards-container">
        {cards.length === 0 ? (
          <div data-testid="empty-state">No cards in this column</div>
        ) : (
          cards.map((card, index) => (
            <Draggable key={card.id} draggableId={card.id} index={index}>
              {(provided) => (
                <div
                  ref={provided.innerRef}
                  {...provided.draggableProps}
                  {...provided.dragHandleProps}
                  data-testid={`card-${card.id}`}
                >
                  <Card 
                    title={card.title} 
                    description={card.description} 
                    onClick={() => onCardClick(card)}
                  />
                </div>
              )}
            </Draggable>
          ))
        )}
      </div>
    </div>
  );
};

export default Column;
