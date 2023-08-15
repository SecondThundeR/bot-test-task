import { Composer } from "grammy";

import { LOCALE } from "@/constants/locale";

import { todosMenu } from "@/menus/todosMenu";

import { getUserTodos } from "@/store/user/todos";

import { type BotContext } from "@/types/bot";

export const todos = new Composer<BotContext>();

todos.command("todos", async (ctx) => {
  const userID = ctx.from?.id;
  if (!userID) return ctx.reply(LOCALE.general.noUserID);

  ctx.session.currentOffset = 0;
  ctx.session.selectedTodo = null;

  const todos = getUserTodos(userID);
  if (todos) {
    ctx.session.currentTodoList = todos;
  }

  await ctx.reply(LOCALE.todos.messageText, {
    reply_markup: todosMenu,
    parse_mode: "MarkdownV2",
  });
});
