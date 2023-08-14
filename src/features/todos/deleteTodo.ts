import { REMOVE_USER_TODO } from "@/constants/postgresQueries";

import { deleteTodoData } from "@/store/user/todos";

import { postgres } from "@/bot";

export async function deleteTodo(id: number, userID: number) {
  await postgres.query(REMOVE_USER_TODO, [id, userID]);
  deleteTodoData(id, userID);
}
