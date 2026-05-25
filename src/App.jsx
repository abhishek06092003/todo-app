import { useEffect, useState } from "react";

function App() {

  // Input state
  const [task, setTask] = useState("");

  // Task array
  const [tasks, setTasks] = useState([]);

  // Filter state
  const [filter, setFilter] = useState("all");

  // Load tasks from localStorage
  useEffect(() => {
    const savedTasks = JSON.parse(
      localStorage.getItem("tasks")
    );

    if (savedTasks) {
      setTasks(savedTasks);
    }
  }, []);

  // Save tasks to localStorage
  useEffect(() => {
    localStorage.setItem(
      "tasks",
      JSON.stringify(tasks)
    );
  }, [tasks]);

  // Add task
  const addTask = () => {
    if (task.trim() === "") return;

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
    const filteredTasks = tasks.filter(
      (item) => item.id !== id
    );

    setTasks(filteredTasks);
  };

  // Toggle complete
  const toggleComplete = (id) => {
    const updatedTasks = tasks.map((item) =>
      item.id === id
        ? { ...item, completed: !item.completed }
        : item
    );

    setTasks(updatedTasks);
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

  return (
    <div className="min-h-screen bg-gray-100 flex justify-center items-center">

      <div className="bg-white p-6 rounded-xl shadow-lg w-[400px]">

        <h1 className="text-3xl font-bold text-center mb-4">
          Todo App
        </h1>

        {/* Input Section */}
        <div className="flex gap-2">

          <input
            type="text"
            placeholder="Enter task"
            className="border p-2 rounded-lg flex-1"
            value={task}
            onChange={(e) => setTask(e.target.value)}

            // Enter key support
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                addTask();
              }
            }}
          />

          <button
            onClick={addTask}
            className="bg-blue-500 text-white px-4 rounded-lg hover:bg-blue-600"
          >
            Add
          </button>

        </div>

        {/* Filter Buttons */}
        <div className="flex justify-center gap-2 mt-4">

          <button
            onClick={() => setFilter("all")}
            className="bg-gray-200 px-3 py-1 rounded-lg"
          >
            All
          </button>

          <button
            onClick={() => setFilter("completed")}
            className="bg-green-200 px-3 py-1 rounded-lg"
          >
            Completed
          </button>

          <button
            onClick={() => setFilter("pending")}
            className="bg-yellow-200 px-3 py-1 rounded-lg"
          >
            Pending
          </button>

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
                className="flex justify-between items-center bg-gray-100 p-3 rounded-lg mb-2"
              >

                {/* Task Text */}
                <p
                  onClick={() => toggleComplete(item.id)}
                  className={`cursor-pointer ${
                    item.completed
                      ? "line-through text-gray-400"
                      : ""
                  }`}
                >
                  {item.text}
                </p>

                {/* Delete Button */}
                <button
                  onClick={() => deleteTask(item.id)}
                  className="bg-red-500 text-white px-3 py-1 rounded-lg hover:bg-red-600"
                >
                  Delete
                </button>

              </div>
            ))
          )}

        </div>

      </div>
    </div>
  );
}

export default App;