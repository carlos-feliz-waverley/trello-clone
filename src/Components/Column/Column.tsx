interface ColumnProps {
  title: string;
  cards: Array<{ id: string; title: string }>;
}

const Column = ({ title, cards }: ColumnProps) => {
  return (
    <div className="bg-white rounded-lg h-full p-4">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-lg font-semibold">{title}</h2>
        <button className="text-blue-500 hover:text-blue-700 cursor-pointer">
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v3m0 0v3m0-3h3m-3 0H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
        </button>
      </div>
      <div className="space-y-2">
        {cards.map((card) => (
          <div key={card.id} className="bg-gray-100 p-2 rounded">
            <h3 className="text-sm font-medium">{card.title}</h3>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Column;
