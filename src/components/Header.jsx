function Header({ darkMode, setDarkMode }) {

  return (

    <div className="flex justify-between items-center mb-4">

      <h1 className="text-3xl font-bold">
        Todo App
      </h1>

      <button
        onClick={() =>
          setDarkMode(!darkMode)
        }
        className={`px-3 py-1 rounded-lg ${
          darkMode
            ? "bg-white text-black"
            : "bg-black text-white"
        }`}
      >
        {darkMode ? "☀️" : "🌙"}
      </button>

    </div>
  );
}

export default Header;