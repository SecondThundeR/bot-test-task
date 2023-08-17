import { LOCALE } from "@/constants/locale";

import { type BotContext } from "@/types/bot";

export async function selectedTodoHandler(ctx: BotContext) {
  await ctx.answerCallbackQuery({
    text: LOCALE.menu.selectedDetails(ctx.session.selectedTodo?.text),
  });
}
