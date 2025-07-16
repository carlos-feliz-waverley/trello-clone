interface CardProps {
  title: string;
  description?: string;
  onClick?: () => void;
}

const Card: React.FC<CardProps> = ({ title, onClick }) => {
  return (
    <div 
      onClick={onClick}
      className="bg-gray-200 p-4 rounded-md shadow-md mb-4 cursor-pointer hover:bg-gray-300"
    >
      <h3>{title}</h3>
    </div>
  );
};

export default Card;
