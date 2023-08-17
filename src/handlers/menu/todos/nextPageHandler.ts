import { LOCALE } from "@/constants/locale";
import { OFFSET_STEP } from "@/constants/offsetStep";

import { type MenuBotContext } from "@/types/bot";

export async function nextPageHandler(ctx: MenuBotContext) {
  if (!ctx.session.currentTodoList)
    return ctx.answerCallbackQuery({
      text: LOCALE.todos.lastPageAlert,
      show_alert: true,
    });

  const newOffset = ctx.session.currentOffset + OFFSET_STEP;
  if (newOffset >= ctx.session.currentTodoList.length)
    return ctx.answerCallbackQuery({
      text: LOCALE.todos.lastPageAlert,
      show_alert: true,
    });

  await ctx.answerCallbackQuery();
  ctx.session.currentOffset = newOffset;
  ctx.menu.update();
}
