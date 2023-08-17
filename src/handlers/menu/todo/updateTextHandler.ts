import { SET_TODO_TEXT } from "@/constants/conversationIds";

import { type BotContext } from "@/types/bot";

export async function updateTextHandler(ctx: BotContext) {
  await ctx.answerCallbackQuery();
  await ctx.deleteMessage();
  await ctx.conversation.enter(SET_TODO_TEXT);
}
