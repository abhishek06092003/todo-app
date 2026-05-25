import TodoItem from "./TodoItem";

function TodoList({
  filteredTasks,
  darkMode,
  toggleComplete,
  deleteTask,
}) {

  return (

    <div className="mt-4">

      {filteredTasks.length === 0 ? (

        <p className="text-center text-gray-400">
          No tasks found
        </p>

      ) : (

        filteredTasks.map((item) => (

          <TodoItem
            key={item.id}
            item={item}
            darkMode={darkMode}
            toggleComplete={toggleComplete}
            deleteTask={deleteTask}
          />

        ))

      )}

    </div>
  );
}

export default TodoList;