import { LOCALE } from "@/constants/locale";

import { setTodoNotificationDate } from "@/features/todos/setTodoNotificationDate";

import { failRetryHandler } from "@/handlers/conversation/failRetryHandler";

import { type BotContext, type BotConversation } from "@/types/bot";

import { isValidDate } from "@/utils/date/isValidDate";

export async function setTodoNotification(
  conversation: BotConversation,
  ctx: BotContext,
) {
  const userID = ctx.from?.id;
  if (!userID) {
    return ctx.reply(LOCALE.general.noUserID);
  }

  const todoID = ctx.session.selectedTodo?.id;
  if (!todoID) {
    return ctx.reply(LOCALE.todos.noTodo);
  }

  await ctx.reply(
    `${LOCALE.todos.enterNotificationDate}\n${LOCALE.general.cancelTip}`,
    {
      parse_mode: "MarkdownV2",
    },
  );

  const result = await failRetryHandler(ctx, conversation, {
    otherwiseText: LOCALE.todos.enterNotificationDate,
    otherwiseParseMode: "MarkdownV2",
    failText: LOCALE.todos.incorrectDate,
    onCheck(msg) {
      return msg.text ? isValidDate(msg.text) : false;
    },
  });
  if (result.status === "failed") return;

  await setTodoNotificationDate(todoID, userID, result.value);
  return ctx.reply(LOCALE.todos.successfullySetNotification);
}
