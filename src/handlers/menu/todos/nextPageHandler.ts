import { type MenuFlavor } from "@grammyjs/menu";

import { OFFSET_STEP } from "@/constants/offsetStep";

import { type BotContext } from "@/types/bot";

export function nextPageHandler(ctx: BotContext & MenuFlavor) {
  if (!ctx.session.currentTodoList) return;

  const newOffset = ctx.session.currentOffset + OFFSET_STEP;
  if (newOffset >= ctx.session.currentTodoList.length) return;

  ctx.session.currentOffset = newOffset;
  ctx.menu.update();
}
