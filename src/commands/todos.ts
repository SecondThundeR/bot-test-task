import { Composer } from "grammy";

import { LOCALE } from "@/constants/locale";

import { setTodoSessionData } from "@/features/todos/setTodoSessionData";

import { todosMenu } from "@/menus/todosMenu";

import { type BotContext } from "@/types/bot";

export const todos = new Composer<BotContext>();

todos.command("todos", async (ctx) => {
  const userID = ctx.from?.id;
  if (!userID) return ctx.reply(LOCALE.general.noUserID);

  setTodoSessionData(ctx, userID);
  await ctx.reply(LOCALE.todos.messageText, {
    reply_markup: todosMenu,
    parse_mode: "MarkdownV2",
  });
});
