import { type Bot } from "grammy";
import { type UserFromGetMe } from "grammy/types";
import { type Client } from "pg";

import { createSubscriptionCronTask } from "@/features/cron/createSubscriptionCronTask";
import { postgresSetup } from "@/features/postgres/postgresSetup";

import { type BotContext } from "@/types/bot";

export async function onStartHandler(
  bot: Bot<BotContext>,
  postgres: Client,
  botInfo: UserFromGetMe,
) {
  await postgresSetup(postgres);
  createSubscriptionCronTask(bot.api);
  console.log(`Logged in as @${botInfo.username}`);
}
