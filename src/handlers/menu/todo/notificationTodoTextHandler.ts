import { LOCALE } from "@/constants/locale";

import { type BotContext } from "@/types/bot";

export function notificationTodoTextHandler(ctx: BotContext) {
  if (!ctx.session.selectedTodo) return "Unknown notification state";
  return LOCALE.todos.manageNotificationText(ctx.session.selectedTodo);
}
