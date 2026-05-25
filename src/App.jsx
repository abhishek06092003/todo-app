import { useEffect, useState } from "react";

import Header from "./components/Header";
import TodoInput from "./components/TodoInput";
import FilterButtons from "./components/FilterButtons";
import TodoList from "./components/TodoList";

function App() {

  const [task, setTask] = useState("");
  const [tasks, setTasks] = useState([]);
  const [filter, setFilter] = useState("all");
  const [darkMode, setDarkMode] = useState(false);

  useEffect(() => {

    const savedTasks = JSON.parse(
      localStorage.getItem("tasks")
    );

    if (savedTasks) {
      setTasks(savedTasks);
    }

  }, []);

  useEffect(() => {

    localStorage.setItem(
      "tasks",
      JSON.stringify(tasks)
    );

  }, [tasks]);

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

  const deleteTask = (id) => {

    const updatedTasks = tasks.filter(
      (item) => item.id !== id
    );

    setTasks(updatedTasks);
  };

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

  const clearCompleted = () => {

    const pendingTasks = tasks.filter(
      (item) => item.completed === false
    );

    setTasks(pendingTasks);
  };

  const filteredTasks = tasks.filter((item) => {

    if (filter === "completed") {
      return item.completed;
    }

    if (filter === "pending") {
      return !item.completed;
    }

    return true;
  });

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

        <Header
          darkMode={darkMode}
          setDarkMode={setDarkMode}
        />

        <TodoInput
          task={task}
          setTask={setTask}
          addTask={addTask}
          darkMode={darkMode}
        />

        <FilterButtons
          setFilter={setFilter}
        />

        <div className="flex justify-between mt-4">

          <p>
            ✅ {completedCount}
          </p>

          <p>
            🕒 {pendingCount}
          </p>

        </div>

        <TodoList
          filteredTasks={filteredTasks}
          darkMode={darkMode}
          toggleComplete={toggleComplete}
          deleteTask={deleteTask}
        />

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