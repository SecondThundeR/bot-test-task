import { LOCALE } from "@/constants/locale";

import { createNewTodo } from "@/features/todos/createNewTodo";

import { failRetryHandler } from "@/handlers/conversation/failRetryHandler";

import { TODOS_NAME_MAX_LENGTH } from "@/store/user/todos";

import { type BotContext, type BotConversation } from "@/types/bot";

export async function createTodo(
  conversation: BotConversation,
  ctx: BotContext,
) {
  const userID = ctx.from?.id;
  if (!userID) {
    return ctx.reply(LOCALE.general.noUserID);
  }

  await ctx.reply(`${LOCALE.todos.enterText}\n${LOCALE.general.cancelTip}`, {
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

  await createNewTodo(userID, result.value);
  return ctx.reply(LOCALE.todos.successfullyCreated);
}
