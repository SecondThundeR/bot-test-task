import { Bot } from "grammy";
import { Client } from "pg";

export function shutdownHandler(bot: Bot, postgres: Client) {
  postgres.end();
  bot.stop();
}
