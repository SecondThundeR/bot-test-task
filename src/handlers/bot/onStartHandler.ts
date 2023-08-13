import { type Bot } from "grammy";
import { type UserFromGetMe } from "grammy/types";
import { type Client } from "pg";

import { type BotContext } from "@/types/bot";

import { createSubscriptionCronTask } from "@/utils/createSubscriptionCronTask";
import { postgresSetup } from "@/utils/postgresSetup";

export async function onStartHandler(
  bot: Bot<BotContext>,
  postgres: Client,
  botInfo: UserFromGetMe,
) {
  await postgresSetup(postgres);
  createSubscriptionCronTask(bot.api);
  console.log(`Logged in as @${botInfo.username}`);
}
