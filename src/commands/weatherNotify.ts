import { Composer } from "grammy";

import { SET_WEATHER_NOTIFICATION } from "@/constants/conversationIds";

import { type BotContext } from "@/types/bot";

export const weatherNotify = new Composer<BotContext>();

weatherNotify.command("weathernotify", async (ctx) => {
  await ctx.conversation.enter(SET_WEATHER_NOTIFICATION);
});
