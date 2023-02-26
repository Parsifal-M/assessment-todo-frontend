import React, { useState } from "react";
import {
  TextField,
  Button,
  Card,
  CardContent,
  makeStyles,
} from "@material-ui/core";
import { Todo } from "../api";

interface EditTodoCardProps {
  todo: Todo;
  onSave: (updatedFields: Partial<Todo>) => void;
  onCancel: () => void;
}

const useStyles = makeStyles((theme) => ({
  card: {
    maxWidth: 400,
    margin: "0 auto",
    marginTop: theme.spacing(4),
    padding: theme.spacing(2),
  },
  textField: {
    marginBottom: theme.spacing(2),
  },
  button: {
    marginRight: theme.spacing(2),
  },
}));

export function EditTodoCard({ todo, onSave, onCancel }: EditTodoCardProps) {
  const classes = useStyles();
  const [title, setTitle] = useState(todo.title);
  const [description, setDescription] = useState(todo.description);

  function handleTitleChange(event: React.ChangeEvent<HTMLInputElement>) {
    setTitle(event.target.value);
  }

  function handleDescriptionChange(event: React.ChangeEvent<HTMLInputElement>) {
    setDescription(event.target.value);
  }

  function handleUpdateTodo() {
    onSave({ title, description });
  }

  return (
    <Card className={classes.card}>
      <CardContent>
        <TextField
          label="Title"
          value={title}
          onChange={handleTitleChange}
          className={classes.textField}
          fullWidth
        />
        <TextField
          label="Description"
          value={description}
          onChange={handleDescriptionChange}
          className={classes.textField}
          fullWidth
        />
        <Button
          variant="contained"
          color="primary"
          onClick={handleUpdateTodo}
          className={classes.button}
        >
          Save
        </Button>
        <Button variant="contained" color="default" onClick={onCancel}>
          Cancel
        </Button>
      </CardContent>
    </Card>
  );
}

export default EditTodoCard;
