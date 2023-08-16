import { RESET_USER_TODO_NOTIFICATION } from "@/constants/postgresQueries";

import { resetTodoNotificationTime } from "@/store/user/todos";

import { postgres } from "@/bot";

export async function resetTodoNotificationDate(id: number, userID: number) {
  await postgres.query(RESET_USER_TODO_NOTIFICATION, [id]);
  resetTodoNotificationTime(id, userID);
}
