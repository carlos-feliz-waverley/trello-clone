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
          className="ml-auto px-4 py-2 bg-blue-800 hover:bg-blue-700 rounded-md"
        >
          Add Column
        </button>
      )}
    </nav>
  );
};

export default Navbar;
