import { UPDATE_USER_TODO_DONE } from "@/constants/postgresQueries";

import { updateTodoData } from "@/store/user/todos";

import { postgres } from "@/bot";

export async function updateTodoDone(
  id: number,
  userID: number,
  done: boolean,
) {
  await postgres.query(UPDATE_USER_TODO_DONE, [done, id]);
  updateTodoData(id, userID, { done });
}
