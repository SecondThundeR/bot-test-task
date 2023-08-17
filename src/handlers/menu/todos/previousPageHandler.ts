import { type MenuFlavor } from "@grammyjs/menu";

import { OFFSET_STEP } from "@/constants/offsetStep";

import { type BotContext } from "@/types/bot";

export function previousPageHandler(ctx: BotContext & MenuFlavor) {
  if (ctx.session.currentOffset === 0) return;

  ctx.session.currentOffset -= OFFSET_STEP;
  ctx.menu.update();
}
