export interface TodoEntry {
  id: number;
  text: string;
  done: boolean;
  date: string | null;
  time: string | null;
}

type TodoEntryUpdateData = Partial<Omit<TodoEntry, "id">>;

export interface DBTodo extends TodoEntry {
  userID: number;
}

export type Todo = Map<number, TodoEntry[]>;

export let todos: Todo = new Map();

const TODOS_NAME_MAX_LENGTH = 200;

export function initTodosData(initTodos: DBTodo[]) {
  const initData: Todo = new Map();
  for (const todo of initTodos) {
    const { userID, ...rest } = todo;
    initData.set(userID, [rest]);
  }
  todos = initData;
}

export function getUserTodos(userID: number) {
  return todos.get(userID);
}

export function insertTodoData(id: number, userID: number, text: string) {
  if (text.length > TODOS_NAME_MAX_LENGTH)
    throw new Error(
      `Task text is more than ${TODOS_NAME_MAX_LENGTH} characters`,
    );

  const newTodo: TodoEntry = { id, text, done: false, date: null, time: null };
  const userTodos = todos.get(userID);
  if (!userTodos) return todos.set(userID, [newTodo]);

  return todos.set(userID, [...userTodos, newTodo]);
}

export function updateTodoData(
  id: number,
  userID: number,
  updateData: TodoEntryUpdateData,
) {
  if (!todos.has(userID)) return;

  const userTodos = todos.get(userID);
  if (!userTodos) return;

  const todoIndex = userTodos.findIndex((todo) => todo.id == id);
  if (todoIndex == -1) return;

  const updatedTodoData = userTodos[todoIndex];
  const { text, done, date, time } = updateData;

  if (text) {
    const updatedText =
      text.length <= TODOS_NAME_MAX_LENGTH ? text : updatedTodoData.text;
    updatedTodoData.text = updatedText;
  }
  if (done !== undefined) updatedTodoData.done = done;
  if (date && time) {
    updatedTodoData.date = date;
    updatedTodoData.time = time;
  }

  userTodos[todoIndex] = updatedTodoData;

  todos.set(userID, userTodos);
}

export function resetTodoNotificationTime(id: number, userID: number) {
  if (!todos.has(userID)) return;

  const userTodos = todos.get(userID);
  if (!userTodos) return;

  const todoIndex = userTodos.findIndex((todo) => todo.id == id);
  if (todoIndex == -1) return;

  const updatedTodoData = userTodos[todoIndex];

  updatedTodoData.date = null;
  updatedTodoData.date = null;

  userTodos[todoIndex] = updatedTodoData;

  todos.set(userID, userTodos);
}

export function deleteTodoData(id: number, userID: number) {
  const modifiedTodos = (todos.get(userID) ?? []).filter(
    (todo) => todo.id !== id,
  );
  return todos.set(userID, modifiedTodos);
}

export function deleteTodosData(userID: number) {
  return todos.delete(userID);
}
