import React, { useState } from "react";
import { createStyles, makeStyles, Theme } from "@material-ui/core/styles";
import {
  Card,
  CardContent,
  TextField,
  Button,
  Typography,
} from "@material-ui/core";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    card: {
      maxWidth: 500,
      margin: "auto",
      marginTop: theme.spacing(2),
      marginBottom: theme.spacing(2),
    },
    form: {
      display: "flex",
      flexDirection: "column",
      justifyContent: "center",
      alignItems: "center",
      padding: theme.spacing(2),
    },
    formField: {
      margin: theme.spacing(1),
      width: "100%",
    },
    formButton: {
      margin: theme.spacing(1),
      width: "100%",
    },
  })
);

interface TodoFormProps {
  onAddTodo: (title: string, description: string) => void;
}

export function TodoForm({ onAddTodo }: TodoFormProps) {
  const classes = useStyles();
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");

  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    onAddTodo(title, description);
    setTitle("");
    setDescription("");
  }

  return (
    <Card className={classes.card}>
      <CardContent>
        <Typography variant="h5" component="h2">
          Add a To-Do
        </Typography>
        <form onSubmit={handleSubmit} className={classes.form}>
          <TextField
            className={classes.formField}
            id="todo-title"
            label="Title"
            variant="outlined"
            value={title}
            onChange={(event) => setTitle(event.target.value)}
          />
          <TextField
            className={classes.formField}
            id="todo-description"
            label="Description"
            variant="outlined"
            value={description}
            onChange={(event) => setDescription(event.target.value)}
          />
          <Button
            type="submit"
            variant="contained"
            color="primary"
            className={classes.formButton}
          >
            Add
          </Button>
        </form>
      </CardContent>
    </Card>
  );
}

export default TodoForm;
