import { Composer } from "grammy";

import { type BotContext } from "@/types/bot";

export const weather = new Composer<BotContext>();

weather.command("weather", async (ctx) => {
  await ctx.conversation.enter("weatherConversation");
});
