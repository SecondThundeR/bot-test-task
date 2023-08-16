import { Menu } from "@grammyjs/menu";

import { CREATE_TODO } from "@/constants/conversationIds";
import { LOCALE } from "@/constants/locale";
import { OFFSET_STEP } from "@/constants/offsetStep";

import { type BotContext } from "@/types/bot";

import { todoMenu } from "./todoMenu";

export const todosMenu = new Menu<BotContext>("todos-menu", {
  fingerprint(ctx) {
    if (!ctx.session.currentTodoList) return "";
    return ctx.session.currentTodoList.map((todo) => todo.text).join("|");
  },
  onMenuOutdated: async (ctx) => {
    await ctx.answerCallbackQuery();
    await ctx.reply(LOCALE.todos.messageText, {
      reply_markup: todosMenu,
      parse_mode: "MarkdownV2",
    });
  },
})
  .dynamic((ctx, range) => {
    const { currentOffset, currentTodoList } = ctx.session;
    if (!currentTodoList) return;

    const newOffset = currentOffset + OFFSET_STEP;

    for (let index = currentOffset; index < newOffset; index++) {
      const todo = currentTodoList[index];
      if (!todo) return;

      const { text, done } = todo;

      range
        .text(`${index + 1}. ${text}${done ? " ✅" : ""}`, (ctx) => {
          ctx.session.selectedTodo = todo;
          ctx.menu.nav("todo-menu");
        })
        .row();
    }
  })
  .row()
  .text(LOCALE.menu.createNewTodo, async (ctx) => {
    await ctx.deleteMessage();
    await ctx.conversation.enter(CREATE_TODO);
  })
  .row()
  .text(LOCALE.menu.prev, (ctx) => {
    if (ctx.session.currentOffset === 0) return;

    ctx.session.currentOffset -= OFFSET_STEP;
    ctx.menu.update();
  })
  .text(LOCALE.menu.next, (ctx) => {
    if (!ctx.session.currentTodoList) return;

    const newOffset = ctx.session.currentOffset + OFFSET_STEP;
    if (newOffset >= ctx.session.currentTodoList.length) return;

    ctx.session.currentOffset = newOffset;
    ctx.menu.update();
  })
  .row()
  .text(LOCALE.menu.closeMenu, async (ctx) => {
    ctx.session.currentOffset = 0;
    ctx.session.currentTodoList = null;
    ctx.session.selectedTodo = null;

    await ctx.deleteMessage();
  });

todosMenu.register(todoMenu);
