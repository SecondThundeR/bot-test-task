import { FAILED_ATTEMPTS_THRESHOLD } from "@/constants/failedAttemptsThreshold";
import { LOCALE } from "@/constants/locale";

import { createNewTodo } from "@/features/todos/createNewTodo";

import { type BotContext, type BotConversation } from "@/types/bot";

export async function createTodoConversation(
  conversation: BotConversation,
  ctx: BotContext,
) {
  const userID = ctx.from?.id;
  if (!userID) {
    return ctx.reply(LOCALE.general.noUserID);
  }

  await ctx.reply(`Enter text for your todo\\. ${LOCALE.general.cancelTip}`, {
    parse_mode: "MarkdownV2",
  });

  let failedAttempts = 0;

  while (true) {
    const message = await conversation.waitFor("message:text", {
      otherwise: async (ctx) => {
        await ctx.reply(LOCALE.weather.nonText);
      },
    });

    if (message.hasCommand("cancel")) return ctx.reply(LOCALE.general.canceled);

    if (failedAttempts >= FAILED_ATTEMPTS_THRESHOLD)
      return ctx.reply(LOCALE.general.failedConversation);

    const { msg } = message;

    try {
      await createNewTodo(userID, msg.text);
      return ctx.reply("Successfully created new todo!");
    } catch (error: unknown) {
      await ctx.reply((error as Error).message);
      failedAttempts++;
    }
  }
}
