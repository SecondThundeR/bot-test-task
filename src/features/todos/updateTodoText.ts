import { UPDATE_USER_TODO_TEXT } from "@/constants/postgresQueries";

import { updateTodoData } from "@/store/user/todos";

import { postgres } from "@/bot";

export async function updateTodoText(id: number, userID: number, text: string) {
  await postgres.query(UPDATE_USER_TODO_TEXT, [text, id]);
  updateTodoData(id, userID, { text });
}
