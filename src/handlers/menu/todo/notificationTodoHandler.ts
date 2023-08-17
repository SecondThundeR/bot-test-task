import { type MenuFlavor } from "@grammyjs/menu";

import { SET_TODO_NOTIFICATION } from "@/constants/conversationIds";

import { resetTodoNotificationDate } from "@/features/todos/resetTodoNotificationDate";

import { type BotContext } from "@/types/bot";

import { isTodoNotificationSet } from "@/utils/store/isTodoNotificationSet";

export async function notificationTodoHandler(ctx: BotContext & MenuFlavor) {
  const { selectedTodo } = ctx.session;
  const userID = ctx.from?.id;
  if (!userID || !selectedTodo) return;

  if (isTodoNotificationSet(selectedTodo)) {
    await resetTodoNotificationDate(selectedTodo.id, userID);
    return ctx.menu.update();
  }

  await ctx.deleteMessage();
  await ctx.conversation.enter(SET_TODO_NOTIFICATION);
}
