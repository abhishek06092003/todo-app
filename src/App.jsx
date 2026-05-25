import { useState } from "react";

function App() {
  // Store input value
  const [task, setTask] = useState("");

  // Store all tasks
  const [tasks, setTasks] = useState([]);

  // Add new task
  const addTask = () => {
    // Prevent empty task
    if (task.trim() === "") return;

    const newTask = {
      id: Date.now(),
      text: task,
    };

    // Add task to array
    setTasks([...tasks, newTask]);

    // Clear input
    setTask("");
  };

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
          />

          <button
            onClick={addTask}
            className="bg-blue-500 text-white px-4 rounded-lg"
          >
            Add
          </button>
        </div>

        {/* Task List */}
        <div className="mt-4">
          {tasks.map((item) => (
            <div
              key={item.id}
              className="bg-gray-100 p-2 rounded-lg mb-2"
            >
              {item.text}
            </div>
          ))}
        </div>

      </div>
    </div>
  );
}

export default App;
