import React, { useEffect, useState } from "react";
import TodoForm from "./components/TodoForm";
import { addTodo, deleteTodoById, getTodos, Todo, updateTodoById } from "./api";
import "./App.css";
import TodoCard from "./components/TodoCard";
import EditTodoCard from "./components/EditTodoCard";

interface AppProps {}

const App: React.FC<AppProps> = () => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [editingTodo, setEditingTodo] = useState<Todo | null>(null);

  useEffect(() => {
    async function fetchTodos() {
      const data = await getTodos();
      setTodos(data);
    }
    fetchTodos();
  }, []);

  async function handleAddTodoSubmit(title: string, description: string) {
    const newTodo = await addTodo({
      title,
      description,
      completed: false,
      createdAt: new Date(),
      updatedAt: new Date(),
    });
    setTodos([...todos, newTodo]);
  }

  function handleEditTodoClick(todo: Todo) {
    setEditingTodo(todo);
  }

  async function handleUpdateTodoStatus(
    id: number,
    updatedFields: Partial<Todo>
  ) {
    await updateTodoById(id, updatedFields);
    const updatedTodos = await getTodos();
    setTodos(updatedTodos);
  }

  async function handleSaveTodoUpdates(updatedFields: Partial<Todo>) {
    if (editingTodo) {
      const updatedTodo = { ...editingTodo, ...updatedFields };
      await updateTodoById(editingTodo.id, updatedTodo);
      const updatedTodos = await getTodos();
      setTodos(updatedTodos);
      setEditingTodo(null);
    }
  }

  function handleCancelEditTodo() {
    setEditingTodo(null);
  }

  async function handleDeleteTodoClick(id: number) {
    await deleteTodoById(id);
    const remainingTodos = todos.filter((todo) => todo.id !== id);
    setTodos(remainingTodos);
  }

  return (
    <div className="app">
      <h1>My To-do's</h1>
      <div className="todo-container-form">
        <TodoForm onAddTodo={handleAddTodoSubmit} />
      </div>
      <div className="todo-container-list">
        {todos.map((todo) => (
          <div className="todo-card" key={todo.id}>
            {editingTodo && editingTodo.id === todo.id ? (
              <EditTodoCard
                todo={editingTodo}
                onSave={handleSaveTodoUpdates}
                onCancel={handleCancelEditTodo}
              />
            ) : (
              <TodoCard
                todo={todo}
                onUpdateTodo={handleUpdateTodoStatus}
                onDeleteTodo={handleDeleteTodoClick}
                onEditTodo={handleEditTodoClick}
              />
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default App;
