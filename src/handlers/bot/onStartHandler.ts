import { Bot } from "grammy";
import { UserFromGetMe } from "grammy/types";
import { Client } from "pg";
import cron from "node-cron";

import {
  GET_WEATHER_NOTIFICATIONS,
  TABLE_QUERY,
} from "@/constants/postgresQueries";

import { sendWeatherNotifications } from "@/features/weather/notify/sendWeatherNotifications";

import { initSubscriptionData } from "@/store/weather/subscriptions";

export async function onStartHandler(
  bot: Bot,
  postgres: Client,
  botInfo: UserFromGetMe
) {
  await postgres.connect();
  await postgres.query(TABLE_QUERY);

  const dbWeatherSubscriptions = await postgres.query(
    GET_WEATHER_NOTIFICATIONS
  );
  initSubscriptionData(dbWeatherSubscriptions.rows);

  cron.schedule("* * * * *", async () => {
    await sendWeatherNotifications(bot.api);
  });

  console.log(`Logged in as @${botInfo.username}`);
}
