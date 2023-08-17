import { type BotContext } from "@/types/bot";

export function fingerprintHandler(ctx: BotContext) {
  if (!ctx.session.currentTodoList) return "";
  return ctx.session.currentTodoList.map((todo) => todo.text).join("|");
}
