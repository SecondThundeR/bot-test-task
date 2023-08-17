import { UPDATE_USER_TODO_NOTIFICATION } from "@/constants/postgresQueries";

import { updateTodoData } from "@/store/user/todos";

import { isValidDate } from "@/utils/date/isValidDate";

import { postgres } from "@/bot";

export async function setTodoNotificationDate(
  id: number,
  userID: number,
  text: string,
) {
  if (!isValidDate(text))
    throw new Error("Incorrect date was provided, try again!");

  const [date, time] = text.split(" ");
  await postgres.query(UPDATE_USER_TODO_NOTIFICATION, [date, time, id]);
  updateTodoData(id, userID, { date, time });
}
