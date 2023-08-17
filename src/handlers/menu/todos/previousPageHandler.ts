import { LOCALE } from "@/constants/locale";
import { OFFSET_STEP } from "@/constants/offsetStep";

import { type MenuBotContext } from "@/types/bot";

export async function previousPageHandler(ctx: MenuBotContext) {
  if (ctx.session.currentOffset === 0)
    return ctx.answerCallbackQuery({
      text: LOCALE.todos.firstPageAlert,
      show_alert: true,
    });

  await ctx.answerCallbackQuery();

  ctx.session.currentOffset -= OFFSET_STEP;
  ctx.menu.update();
}
