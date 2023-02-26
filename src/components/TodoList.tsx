import {
  Checkbox,
  IconButton,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@material-ui/core";
import { Delete } from "@material-ui/icons";
import { Todo } from "../api";

interface TodoListProps {
  todos: Todo[];
  onDeleteTodo: (id: number) => void;
  onUpdateTodo: (id: number, updatedFields: Partial<Todo>) => void;
}

export function TodoList({ todos, onDeleteTodo, onUpdateTodo }: TodoListProps) {
  function handleToggle(id: number) {
    const todoToUpdate = todos.find((todo) => todo.id === id);
    if (todoToUpdate) {
      onUpdateTodo(id, { completed: !todoToUpdate.completed });
    }
  }

  function handleDelete(id: number) {
    onDeleteTodo(id);
  }

  return (
    <TableContainer>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>Title</TableCell>
            <TableCell>Description</TableCell>
            <TableCell>Completed</TableCell>
            <TableCell>Actions</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {todos.map((todo) => (
            <TableRow key={todo.id}>
              <TableCell>{todo.title}</TableCell>
              <TableCell>{todo.description}</TableCell>
              <TableCell>
                <Checkbox
                  checked={todo.completed}
                  onChange={() => handleToggle(todo.id)}
                />
              </TableCell>
              <TableCell>
                <IconButton onClick={() => handleDelete(todo.id)}>
                  <Delete />
                </IconButton>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}

export default TodoList;
