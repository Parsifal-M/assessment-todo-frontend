export interface Todo {
  id: number;
  title: string;
  description: string;
  completed: boolean;
  createdAt: Date;
  updatedAt: Date;
}

// Fetches all todos from the server and returns them as an array of `Todo` objects.
export async function getTodos(): Promise<Todo[]> {
  try {
    const response = await fetch("http://localhost:4000/api/todos");
    const data = await response.json();
    if (Array.isArray(data.todos)) {
      return data.todos;
    } else {
      throw new Error("Invalid response format");
    }
  } catch (error) {
    throw new Error(`Failed to fetch todos: ${error}`);
  }
}

// Adds a new todo to the server and returns the new `Todo` object.
export async function addTodo(todo: Omit<Todo, "id">) {
  const response = await fetch("http://localhost:4000/api/todos", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      title: todo.title,
      description: todo.description,
      completed: false,
      createdAt: new Date(),
      updatedAt: new Date(),
    }),
  });
  const data = await response.json();
  const newTodo: Todo = data.todo;
  return newTodo;
}

// Updates a todo with the specified `id` on the server and returns the updated `Todo` object.
export async function updateTodoById(id: number, updatedFields: Partial<Todo>) {
  const response = await fetch(`http://localhost:4000/api/todos/${id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(updatedFields),
  });
  const data = await response.json();
  const updatedTodo: Todo = data.todo;
  return updatedTodo;
}

// Deletes a todo with the specified `id` from the server and returns the deleted `Todo` object.
export async function deleteTodoById(id: number) {
  const response = await fetch(`http://localhost:4000/api/todos/${id}`, {
    method: "DELETE",
  });
  const data = await response.json();
  const deletedTodo: Todo = data.todo;
  return deletedTodo;
}
