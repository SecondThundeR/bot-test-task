import { type BotContext } from "@/types/bot";

export async function closeMenuHandler(ctx: BotContext) {
  await ctx.answerCallbackQuery();

  ctx.session.currentOffset = 0;
  ctx.session.currentTodoList = null;
  ctx.session.selectedTodo = null;

  await ctx.deleteMessage();
}
