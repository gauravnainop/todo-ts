const Navbar = () => {
  return (
    <>
      <nav className="w-full px-3 h-16 bg-gray-600 flex items-center justify-between text-white font-bold text-xl">
        <div>
          <h1>
            <a href="/">To Do App</a>
          </h1>
        </div>
        <div>
          <a href="/history" className="ml-4 text-white hover:text-gray-300">
            History
          </a>
        </div>
      </nav>
    </>
  );
};

export default Navbar;
