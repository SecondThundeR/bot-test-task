import { LOCALE } from "@/constants/locale";

import { todosMenu } from "@/menus/todosMenu";

import { type BotContext } from "@/types/bot";

export async function onMenuOutdatedHandler(ctx: BotContext) {
  await ctx.answerCallbackQuery();
  await ctx.reply(LOCALE.todos.messageText, {
    reply_markup: todosMenu,
    parse_mode: "MarkdownV2",
  });
}
