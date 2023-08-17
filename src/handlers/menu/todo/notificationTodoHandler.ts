import { SET_TODO_NOTIFICATION } from "@/constants/conversationIds";
import { LOCALE } from "@/constants/locale";

import { resetTodoNotificationDate } from "@/features/todos/resetTodoNotificationDate";

import { type MenuBotContext } from "@/types/bot";

import { isTodoNotificationSet } from "@/utils/store/isTodoNotificationSet";

export async function notificationTodoHandler(ctx: MenuBotContext) {
  const { selectedTodo } = ctx.session;
  const userID = ctx.from?.id;
  if (!userID || !selectedTodo)
    return ctx.answerCallbackQuery({
      text: LOCALE.todos.manipulateError,
      show_alert: true,
    });

  await ctx.answerCallbackQuery();

  if (isTodoNotificationSet(selectedTodo)) {
    await resetTodoNotificationDate(selectedTodo.id, userID);
    return ctx.menu.update();
  }

  await ctx.deleteMessage();
  await ctx.conversation.enter(SET_TODO_NOTIFICATION);
}
