import React, { useState } from "react";
import "./index.css";

export default function App() {
  const [newItem, setNewItem] = useState("");
  const [todos, setTodos] = useState([]);

  function handleSubmit(e) {
    e.preventDefault();
    if (newItem.trim() === "") return;
    setTodos((currentTodos) => [
      ...currentTodos,
      { id: crypto.randomUUID(), title: newItem, completed: false },
    ]);
    setNewItem("");
  }

  function toggleTodo(id, completed) {
    setTodos((currentTodos) =>
      currentTodos.map((todo) =>
        todo.id === id ? { ...todo, completed } : todo
      )
    );
  }

  function deleteTodo(id) {
    setTodos((currentTodos) => {
      return currentTodos.filter((todo) => todo.id !== id);
    });
  }

  return (
    <div className="min-h-screen flex justify-center items-center bg-gray-100">
      <div className="w-full max-w-md p-6 bg-white rounded-lg shadow-lg">
        <h1 className="text-2xl font-bold text-gray-800 text-center mb-5">
          Todo List
        </h1>

        <form onSubmit={handleSubmit} className="flex gap-3 mb-5">
          <input
            value={newItem}
            onChange={(e) => setNewItem(e.target.value)}
            type="text"
            placeholder="Add a new task"
            className="flex-grow p-2 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500"
          />
          <button
            type="submit"
            className="px-4 py-2 bg-blue-600 text-white font-semibold rounded-md hover:bg-blue-700"
          >
            Add
          </button>
        </form>

        <h2 className="text-lg font-medium text-gray-700 mb-3">Pending</h2>
        <ul className="mb-5">
          {todos
            .filter((todo) => !todo.completed)
            .map((todo) => (
              <li
                key={todo.id}
                className="flex justify-between items-center p-3 bg-gray-100 border border-gray-200 rounded-md mb-2"
              >
                <label className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={todo.completed}
                    onChange={(e) => toggleTodo(todo.id, e.target.checked)}
                    className="w-5 h-5 cursor-pointer"
                  />
                  <span>{todo.title}</span>
                </label>
                <button
                  onClick={() => deleteTodo(todo.id)}
                  className="text-red-500 hover:text-red-700"
                >
                  Delete
                </button>
              </li>
            ))}
        </ul>

        <h2 className="text-lg font-medium text-gray-700 mb-3">Completed</h2>
        <ul>
          {todos
            .filter((todo) => todo.completed)
            .map((todo) => (
              <li
                key={todo.id}
                className="flex justify-between items-center p-3 bg-green-100 border border-green-200 rounded-md mb-2"
              >
                <label className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={todo.completed}
                    onChange={(e) => toggleTodo(todo.id, e.target.checked)}
                    className="w-5 h-5 cursor-pointer"
                  />
                  <span className="line-through text-green-700">
                    {todo.title}
                  </span>
                </label>
                <button
                  onClick={() => deleteTodo(todo.id)}
                  className="text-red-500 hover:text-red-700"
                >
                  Delete
                </button>
              </li>
            ))}
        </ul>
      </div>
    </div>
  );
}
