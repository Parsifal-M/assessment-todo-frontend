import { Todo } from "../api";

export interface TodoCardProps {
    todo: Todo;
    onUpdateTodo: (id: number, updatedFields: Partial<Todo>) => void;
    onDeleteTodo: (id: number) => void;
    onEditTodo: (todo: Todo) => void;
}
