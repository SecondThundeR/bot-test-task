import { Composer } from "grammy";

import { type BotContext } from "@/types/bot";

export const weatherNotify = new Composer<BotContext>();

weatherNotify.command("weathernotify", async (ctx) => {
  await ctx.conversation.enter("weatherNotifyConversation");
});
