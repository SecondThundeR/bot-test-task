import { SET_USER_TODO } from "@/constants/postgresQueries";

import { insertTodoData, type DBTodo } from "@/store/user/todos";

import { postgres } from "@/bot";

export async function createNewTodo(userID: number, text: string) {
  const todo = await postgres.query<DBTodo>(SET_USER_TODO, [
    userID,
    text,
    false,
  ]);
  insertTodoData(todo.rows[0].id, userID, text);
}
