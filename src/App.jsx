import { useState } from "react";

function App() {
  const [task, setTask] = useState("");

  return (
    <div className="min-h-screen bg-gray-100 flex justify-center items-center">
      <div className="bg-white p-6 rounded-xl shadow-lg w-[400px]">
        
        <h1 className="text-3xl font-bold text-center mb-4">
          Todo App
        </h1>

        <div className="flex gap-2">
          <input
            type="text"
            placeholder="Enter task"
            className="border p-2 rounded-lg flex-1"
            value={task}
            onChange={(e) => setTask(e.target.value)}
          />

          <button className="bg-blue-500 text-white px-4 rounded-lg">
            Add
          </button>
        </div>

      </div>
    </div>
  );
}

export default App;
