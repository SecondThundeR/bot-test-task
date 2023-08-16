import { type Api, type RawApi } from "grammy";

import { LOCALE } from "@/constants/locale";

import { resetTodoNotificationDate } from "@/features/todos/resetTodoNotificationDate";

import { todos, type TodoEntry } from "@/store/user/todos";

import { isNotificationTime } from "@/utils/isNotificationTime";

export async function sendTodosNotifications(api: Api<RawApi>, date: Date) {
  const todosData = todos.entries();

  for (const [userID, todoData] of todosData) {
    const notificationTodos = todoData.reduce((acc, curr) => {
      if (!curr.date && !curr.time) return acc;
      acc.push(curr);
      return acc;
    }, [] as TodoEntry[]);
    if (notificationTodos.length === 0) continue;

    const notificationTexts: string[] = [];
    for (const todo of notificationTodos) {
      if (!isNotificationTime(todo.date, todo.time, date)) continue;

      notificationTexts.push(todo.text);
      resetTodoNotificationDate(todo.id, userID).catch(console.error);
    }

    if (notificationTexts.length === 0) continue;

    await api.sendMessage(
      userID,
      `${LOCALE.todos.notificationHeader(
        notificationTexts.length > 1,
      )}${notificationTexts.join("\n")}`,
      {
        parse_mode: "HTML",
      },
    );
  }
}
