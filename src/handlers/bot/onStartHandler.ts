import { type Bot } from "grammy";
import { type UserFromGetMe } from "grammy/types";
import cron from "node-cron";
import { type Client } from "pg";

import {
  GET_WEATHER_NOTIFICATIONS,
  TABLE_QUERY,
} from "@/constants/postgresQueries";

import { sendWeatherNotifications } from "@/features/weather/notify/sendWeatherNotifications";

import {
  initSubscriptionData,
  type Subscription,
} from "@/store/weather/subscriptions";

import { type BotContext } from "@/types/bot";

export async function onStartHandler(
  bot: Bot<BotContext>,
  postgres: Client,
  botInfo: UserFromGetMe,
) {
  await postgres.connect();
  await postgres.query(TABLE_QUERY);

  const dbWeatherSubscriptions = await postgres.query(
    GET_WEATHER_NOTIFICATIONS,
  );
  initSubscriptionData(dbWeatherSubscriptions.rows as Subscription[]);

  cron.schedule("* * * * *", async () => {
    await sendWeatherNotifications(bot.api);
  });

  console.log(`Logged in as @${botInfo.username}`);
}
