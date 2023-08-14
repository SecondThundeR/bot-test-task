import { REMOVE_USER_TODOS } from "@/constants/postgresQueries";

import { deleteTodosData } from "@/store/user/todos";

import { postgres } from "@/bot";

export async function deleteTodo(id: number, userID: number) {
  await postgres.query(REMOVE_USER_TODOS);
  deleteTodosData(userID);
}
