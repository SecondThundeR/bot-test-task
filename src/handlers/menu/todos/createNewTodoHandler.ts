import { CREATE_TODO } from "@/constants/conversationIds";

import { type BotContext } from "@/types/bot";

export async function createNewTodoHandler(ctx: BotContext) {
  await ctx.deleteMessage();
  await ctx.conversation.enter(CREATE_TODO);
}
