import { type Bot } from "grammy";
import { type Client } from "pg";

export function shutdownHandler(bot: Bot, postgres: Client) {
  postgres.end().catch(console.error);
  bot.stop().catch(console.error);
}
