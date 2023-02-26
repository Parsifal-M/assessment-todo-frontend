import { useState } from "react";
import {
  Card,
  CardActions,
  CardContent,
  IconButton,
  Typography,
} from "@material-ui/core";
import { CheckCircle, Delete, Edit } from "@material-ui/icons";
import { Todo } from "../api";
import EditTodoCard from "./EditTodoCard";

interface TodoCardProps {
  todo: Todo;
  onUpdateTodo: (id: number, updatedFields: Partial<Todo>) => void;
  onDeleteTodo: (id: number) => void;
  onEditTodo: (todo: Todo) => void;
}

export function TodoCard({
  todo,
  onUpdateTodo,
  onDeleteTodo,
  onEditTodo,
}: TodoCardProps) {
  const [isEditing, setIsEditing] = useState(false);

  function handleDoneButtonClick() {
    onUpdateTodo(todo.id, { completed: !todo.completed });
  }

  function handleEditButtonClick() {
    setIsEditing(true);
    onEditTodo?.(todo);
  }

  function handleDeleteButtonClick() {
    onDeleteTodo(todo.id);
  }

  function handleEditSave() {
    setIsEditing(false);
  }

  function handleEditCancel() {
    setIsEditing(false);
  }

  return (
    <>
      {isEditing ? (
        <EditTodoCard
          todo={todo}
          onSave={handleEditSave}
          onCancel={handleEditCancel}
        />
      ) : (
        <Card className={todo.completed ? "completed" : ""}>
          <CardContent>
            <Typography variant="h5" component="h2">
              {todo.title}
            </Typography>
            <Typography variant="body2" component="p">
              {todo.description}
            </Typography>
          </CardContent>
          <CardActions>
            <IconButton aria-label="done" onClick={handleDoneButtonClick}>
              <CheckCircle
                style={{ color: todo.completed ? "green" : "inherit" }}
              />
            </IconButton>
            <IconButton aria-label="edit" onClick={handleEditButtonClick}>
              <Edit />
            </IconButton>
            <IconButton aria-label="delete" onClick={handleDeleteButtonClick}>
              <Delete />
            </IconButton>
          </CardActions>
        </Card>
      )}
    </>
  );
}

export default TodoCard;
