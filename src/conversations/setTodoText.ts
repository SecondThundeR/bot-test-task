import { LOCALE } from "@/constants/locale";

import { updateTodoText } from "@/features/todos/updateTodoText";

import { failRetryHandler } from "@/handlers/conversation/failRetryHandler";

import { TODOS_NAME_MAX_LENGTH } from "@/store/user/todos";

import { type BotContext, type BotConversation } from "@/types/bot";

export async function setTodoText(
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

  await ctx.reply(`${LOCALE.todos.enterNewText}\n${LOCALE.general.cancelTip}`, {
    parse_mode: "MarkdownV2",
  });

  const result = await failRetryHandler(ctx, conversation, {
    otherwiseText: LOCALE.todos.nonText,
    failText: LOCALE.todos.longText,
    onCheck(msg) {
      return msg.text ? msg.text.length <= TODOS_NAME_MAX_LENGTH : false;
    },
  });
  if (result.status === "failed") return;

  try {
    await updateTodoText(todoID, userID, result.value);
    return ctx.reply(LOCALE.todos.successfullyUpdated);
  } catch (error: unknown) {
    await ctx.reply((error as Error).message);
  }
}
