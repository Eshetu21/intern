import React, { useState } from "react";
import "./index.css"; // Import the CSS file

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
    <div className="container">
      <h1>Todo List</h1>

      <form onSubmit={handleSubmit}>
        <input
          value={newItem}
          onChange={(e) => setNewItem(e.target.value)}
          type="text"
          placeholder="Add a new task"
        />
        <button type="submit">Add</button>
      </form>

      <h2 className="section-title">Pending</h2>
      <ul>
        {todos
          .filter((todo) => !todo.completed)
          .map((todo) => (
            <li key={todo.id} className="todo-item pending">
              <label>
                <input
                  type="checkbox"
                  checked={todo.completed}
                  onChange={(e) => toggleTodo(todo.id, e.target.checked)}
                />
                <span>{todo.title}</span>
              </label>
              <button
                onClick={() => deleteTodo(todo.id)}
                className="delete-button"
              >
                Delete
              </button>
            </li>
          ))}
      </ul>

      <h2 className="section-title">Completed</h2>
      <ul>
        {todos
          .filter((todo) => todo.completed)
          .map((todo) => (
            <li key={todo.id} className="todo-item completed">
              <label>
                <input
                  type="checkbox"
                  checked={todo.completed}
                  onChange={(e) => toggleTodo(todo.id, e.target.checked)}
                />
                <span>{todo.title}</span>
              </label>
              <button
                onClick={() => deleteTodo(todo.id)}
                className="delete-button"
              >
                Delete
              </button>
            </li>
          ))}
      </ul>
    </div>
  );
}
