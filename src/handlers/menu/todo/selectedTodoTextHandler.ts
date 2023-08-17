import { LOCALE } from "@/constants/locale";

import { type BotContext } from "@/types/bot";

export function selectedTodoTextHandler(ctx: BotContext) {
  return `${LOCALE.menu.selected}${
    ctx.session.selectedTodo?.text ?? "Unknown"
  }`;
}
