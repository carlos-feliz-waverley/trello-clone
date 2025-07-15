import Column from '../Column/Column';

interface Column {
  id: string;
  title: string;
  cards: Array<{ id: string; title: string }>;
}

interface ColumnsProps {
  columns: Column[];
}

const Columns = ({ columns }: ColumnsProps) => {
  return (
    <div className="grid grid-cols-4 gap-2.5 h-full">
      {columns.map((column) => (
        <div className="h-full">
          <Column key={column.id} title={column.title} cards={column.cards} />
        </div>
      ))}
    </div>
  );
};

export default Columns;
