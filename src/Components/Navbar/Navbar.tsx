interface NavbarProps {
  onAddColumn?: () => void;
}

const Navbar = ({ onAddColumn }: NavbarProps) => {
  return (
    <nav className="bg-blue-950 text-white p-4 fixed top-0 left-0 right-0 z-50 flex items-center">
      <span className="text-xl font-bold">Trello Clone</span>
      {onAddColumn && (
        <button
          onClick={onAddColumn}
          className="ml-auto bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-4 rounded"
        >
          Add Column
        </button>
      )}
    </nav>
  );
};

export default Navbar;
