import { type BotContext } from "@/types/bot";

export async function goBackHandler(ctx: BotContext) {
  await ctx.answerCallbackQuery();
  ctx.session.selectedTodo = null;
}
