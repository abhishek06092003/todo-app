function TodoItem({
  item,
  darkMode,
  toggleComplete,
  deleteTask,
}) {

  return (

    <div
      className={`flex justify-between items-center p-3 rounded-lg mb-2 ${
        darkMode
          ? "bg-gray-700"
          : "bg-gray-100"
      }`}
    >

      <p
        onClick={() =>
          toggleComplete(item.id)
        }
        className={`cursor-pointer ${
          item.completed
            ? "line-through text-gray-400"
            : ""
        }`}
      >
        {item.text}
      </p>

      <button
        onClick={() =>
          deleteTask(item.id)
        }
        className="bg-red-500 text-white px-3 py-1 rounded-lg"
      >
        Delete
      </button>

    </div>
  );
}

export default TodoItem;