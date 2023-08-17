import { type BotContext } from "@/types/bot";

export function goBackHandler(ctx: BotContext) {
  ctx.session.selectedTodo = null;
}
