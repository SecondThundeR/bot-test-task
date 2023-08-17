import { LOCALE } from "@/constants/locale";

import { type BotContext } from "@/types/bot";

export function markTodoTextHandler(ctx: BotContext) {
  const doneStatus = ctx.session.selectedTodo?.done ?? false;
  return LOCALE.todos.markAs(doneStatus);
}
