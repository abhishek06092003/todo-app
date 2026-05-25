function TodoInput({
  task,
  setTask,
  addTask,
  darkMode,
}) {

  return (

    <div className="flex gap-2">

      <input
        type="text"
        placeholder="Enter task"
        value={task}
        onChange={(e) =>
          setTask(e.target.value)
        }

        onKeyDown={(e) => {

          if (e.key === "Enter") {
            addTask();
          }

        }}

        className={`border p-2 rounded-lg flex-1 ${
          darkMode
            ? "bg-gray-700 text-white border-gray-600"
            : "bg-white text-black"
        }`}
      />

      <button
        onClick={addTask}
        className="bg-blue-500 text-white px-4 rounded-lg"
      >
        Add
      </button>

    </div>
  );
}

export default TodoInput;