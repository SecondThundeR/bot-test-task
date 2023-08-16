import { type TodoEntry } from "@/store/user/todos";

export function isTodoNotificationSet(todo: TodoEntry) {
  return todo.date !== null && todo.time !== null;
}
