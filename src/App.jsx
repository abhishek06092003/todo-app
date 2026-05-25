import { useEffect, useState } from "react";

function App() {

  const [task, setTask] = useState("");
  const [tasks, setTasks] = useState([]);
  const [filter, setFilter] = useState("all");
  const [darkMode, setDarkMode] = useState(false);

  // Load tasks
  useEffect(() => {

    const savedTasks = JSON.parse(
      localStorage.getItem("tasks")
    );

    if (savedTasks) {
      setTasks(savedTasks);
    }

  }, []);

  // Save tasks
  useEffect(() => {

    localStorage.setItem(
      "tasks",
      JSON.stringify(tasks)
    );

  }, [tasks]);

  // Add task
  const addTask = () => {

    if (task.trim() === "") {
      return;
    }

    const newTask = {
      id: Date.now(),
      text: task,
      completed: false,
    };

    setTasks([...tasks, newTask]);

    setTask("");
  };

  // Delete task
  const deleteTask = (id) => {

    const updatedTasks = tasks.filter(
      (item) => item.id !== id
    );

    setTasks(updatedTasks);
  };

  // Complete task
  const toggleComplete = (id) => {

    const updatedTasks = tasks.map((item) => {

      if (item.id === id) {

        return {
          ...item,
          completed: !item.completed,
        };

      }

      return item;
    });

    setTasks(updatedTasks);
  };

  // Clear completed
  const clearCompleted = () => {

    const pendingTasks = tasks.filter(
      (item) => item.completed === false
    );

    setTasks(pendingTasks);
  };

  // Filter tasks
  const filteredTasks = tasks.filter((item) => {

    if (filter === "completed") {
      return item.completed;
    }

    if (filter === "pending") {
      return !item.completed;
    }

    return true;
  });

  // Counts
  const completedCount = tasks.filter(
    (item) => item.completed
  ).length;

  const pendingCount = tasks.filter(
    (item) => !item.completed
  ).length;

  return (

    <div
      className={`min-h-screen flex justify-center items-center p-4 ${
        darkMode
          ? "bg-gray-900"
          : "bg-gray-100"
      }`}
    >

      <div
        className={`w-[400px] p-6 rounded-xl shadow-lg ${
          darkMode
            ? "bg-gray-800 text-white"
            : "bg-white text-black"
        }`}
      >

        {/* Header */}
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

        {/* Input */}
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

        {/* Filter Buttons */}
        <div className="flex justify-center gap-2 mt-4">

          <button
            onClick={() => setFilter("all")}
            className="bg-gray-300 text-black px-3 py-1 rounded-lg"
          >
            All
          </button>

          <button
            onClick={() =>
              setFilter("completed")
            }
            className="bg-green-300 text-black px-3 py-1 rounded-lg"
          >
            Completed
          </button>

          <button
            onClick={() =>
              setFilter("pending")
            }
            className="bg-yellow-300 text-black px-3 py-1 rounded-lg"
          >
            Pending
          </button>

        </div>

        {/* Counter */}
        <div className="flex justify-between mt-4">

          <p>
            ✅ {completedCount}
          </p>

          <p>
            🕒 {pendingCount}
          </p>

        </div>

        {/* Task List */}
        <div className="mt-4">

          {filteredTasks.length === 0 ? (

            <p className="text-center text-gray-400">
              No tasks found
            </p>

          ) : (

            filteredTasks.map((item) => (

              <div
                key={item.id}
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

            ))

          )}

        </div>

        {/* Clear Completed */}
        {completedCount > 0 && (

          <button
            onClick={clearCompleted}
            className="w-full mt-4 bg-red-500 text-white py-2 rounded-lg"
          >
            Clear Completed
          </button>

        )}

      </div>

    </div>
  );
}

export default App;