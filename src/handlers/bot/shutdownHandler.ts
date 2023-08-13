import { type Bot } from "grammy";
import { type Client } from "pg";

import { type BotContext } from "@/types/bot";

export function shutdownHandler(bot: Bot<BotContext>, postgres: Client) {
  postgres.end().catch(console.error);
  bot.stop().catch(console.error);
}
