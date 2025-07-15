import './Card.css';

interface CardProps {
  title: string;
  description?: string;
  onClick?: () => void;
}

const Card: React.FC<CardProps> = ({ title, description, onClick }) => {
  return (
    <div 
      className="card"
      onClick={onClick}
    >
      <h3>{title}</h3>
      {description && <p>{description}</p>}
    </div>
  );
};

export default Card;
