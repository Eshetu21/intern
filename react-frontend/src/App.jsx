import { useState, useEffect } from "react";
import axios from "axios";

export default function App() {
  const [newItem, setNewItem] = useState("");
  const [newDescription, setNewDescription] = useState("");
  const [todos, setTodos] = useState([]);
  const [isUpdating, setIsUpdating] = useState(false);
  const [currentTodoId, setCurrentTodoId] = useState(null);

  useEffect(() => {
    axios
      .get("http://192.168.23.180:80/api/fetch")
      .then((response) => setTodos(response.data.todos || []))
      .catch((error) => console.error("Error fetching todos:", error));
  }, []);

  function handleSubmit(e) {
    e.preventDefault();
    if (newItem.trim() === "") return;

    if (isUpdating) {
      axios
        .put(`http://192.168.23.180:80/api/update/${currentTodoId}`, {
          todo_title: newItem,
          todo_description: newDescription,
          todo_status: false,
        })
        .then((response) => {
          setTodos(
            todos.map((todo) =>
              todo.id === currentTodoId ? response.data.todo : todo
            )
          );
          setNewItem("");
          setNewDescription("");
          setIsUpdating(false);
          setCurrentTodoId(null);
        })
        .catch((error) => console.error("Error updating todo:", error));
    } else {
      axios
        .post("http://192.168.23.180:80/api/add", {
          todo_title: newItem,
          todo_description: newDescription,
          todo_status: false,
        })
        .then((response) => {
          setTodos([...todos, response.data.todo]);
          setNewItem("");
          setNewDescription("");
        })
        .catch((error) => console.error("Error adding todo:", error));
    }
  }

  function handleDelete(todoId) {
    axios
      .delete(`http://192.168.23.180:80/api/delete/${todoId}`)
      .then(() => {
        setTodos(todos.filter((todo) => todo.id !== todoId));
        if (isUpdating && currentTodoId === todoId) {
          setNewItem("");
          setNewDescription("");
          setIsUpdating(false);
          setCurrentTodoId(null);
        }
      })
      .catch((error) => console.error("Error deleting todo:", error));
  }

  function handleUpdate(todo) {
    setNewItem(todo.todo_title);
    setNewDescription(todo.todo_description);
    setIsUpdating(true);
    setCurrentTodoId(todo.id);
  }

  function toggleStatus(todo) {
    const updatedStatus = !todo.todo_status;
    axios
      .put(`http://192.168.23.180:80/api/update/${todo.id}`, {
        todo_title: todo.todo_title,
        todo_description: todo.todo_description,
        todo_status: updatedStatus,
      })
      .then((response) => {
        setTodos(
          todos.map((t) =>
            t.id === todo.id ? { ...t, todo_status: updatedStatus } : t
          )
        );
      })
      .catch((error) => console.error("Error toggling todo status:", error));
  }

  const pendingTodos = todos.filter((todo) => !todo.todo_status);
  const completedTodos = todos.filter((todo) => todo.todo_status);

  return (
    <div className="min-h-screen flex justify-center items-center bg-gray-100">
      <div className="w-full max-w-md p-6 bg-white rounded-lg shadow-lg">
        <h1 className="text-2xl font-bold text-gray-800 text-center mb-5">
          Todo List
        </h1>

        <form onSubmit={handleSubmit} className="flex flex-col gap-3 mb-5">
          <input
            value={newItem}
            onChange={(e) => setNewItem(e.target.value)}
            type="text"
            placeholder="Add a new task title"
            className="p-2 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500"
          />
          <textarea
            value={newDescription}
            onChange={(e) => setNewDescription(e.target.value)}
            placeholder="Add a description"
            className="p-2 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500"
          />
          <button
            type="submit"
            className="px-4 py-2 bg-blue-600 text-white font-semibold rounded-md hover:bg-blue-700"
          >
            {isUpdating ? "Update" : "Add"}
          </button>
        </form>

        {}
        <h2 className="text-xl font-semibold mb-3">Pending</h2>
        <ul className="mb-5">
          {pendingTodos.map((todo) => (
            <li
              key={todo.id}
              className="flex justify-between items-center p-2 border-b border-gray-300"
            >
              <div>
                <h3 className="font-bold">{todo.todo_title}</h3>
                <p>{todo.todo_description}</p>
              </div>
              <div>
                <button
                  onClick={() => handleUpdate(todo)}
                  className="px-2 py-1 text-blue-500"
                >
                  Update
                </button>
                <button
                  onClick={() => toggleStatus(todo)}
                  className="px-2 py-1 text-green-500"
                >
                  Complete
                </button>
                <button
                  onClick={() => handleDelete(todo.id)}
                  className="px-2 py-1 text-red-500"
                >
                  Delete
                </button>
              </div>
            </li>
          ))}
        </ul>

        {}
        <h2 className="text-xl font-semibold mb-3">Completed</h2>
        <ul>
          {completedTodos.map((todo) => (
            <li
              key={todo.id}
              className="flex justify-between items-center p-2 border-b border-gray-300"
            >
              <div>
                <h3 className="font-bold">{todo.todo_title}</h3>
                <p>{todo.todo_description}</p>
              </div>
              <div>
                <button
                  onClick={() => toggleStatus(todo)}
                  className="px-2 py-1 text-yellow-500"
                >
                  Mark as Pending
                </button>
                <button
                  onClick={() => handleDelete(todo.id)}
                  className="px-2 py-1 text-red-500"
                >
                  Delete
                </button>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
