import { Todo } from "../api";

export interface EditTodoCardProps {
    todo: Todo;
    onSave: (updatedFields: Partial<Todo>) => void;
    onCancel: () => void;
}
