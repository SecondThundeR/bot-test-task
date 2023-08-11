import "dotenv/config";
import { Bot, GrammyError, HttpError } from "grammy";
import { limit } from "@grammyjs/ratelimiter";
import Redis from "ioredis";
import { Client } from "pg";
import cron from "node-cron";

import { cat } from "@/commands/cat";
import { dog } from "@/commands/dog";
import { start } from "@/commands/start";
import { help } from "@/commands/help";
import { weather } from "@/commands/weather";
import { weatherReset } from "@/commands/weatherReset";
import { weatherNotify } from "@/commands/weatherNotify";

import { commandsData } from "@/constants/commandsData";
import { getUserNotifications, tableQuery } from "@/constants/postgresQueries";

import { sendWeatherNotifications } from "@/features/weather/notify/sendWeatherNotifications";

import { initSubscriptionData } from "@/store/weather/subscriptions";

const {
  BOT_TOKEN,
  REDISPORT,
  REDISHOST,
  REDISUSER,
  REDISPASSWORD,
  PGDATABASE,
  PGHOST,
  PGPASSWORD,
  PGPORT,
  PGUSER,
} = process.env;

if (!BOT_TOKEN) {
  console.error("Bot token is empty!");
  process.exit(1);
}

const redis = new Redis({
  port: Number(REDISPORT),
  host: REDISHOST,
  username: REDISUSER,
  password: REDISPASSWORD,
});

export const postgres = new Client({
  host: PGHOST,
  port: Number(PGPORT),
  database: PGDATABASE,
  user: PGUSER,
  password: PGPASSWORD,
});

const bot = new Bot(BOT_TOKEN);
const pm = bot.filter((ctx) => ctx.chat?.type === "private");

bot.api.setMyCommands(commandsData);

bot.use(
  limit({
    timeFrame: 2000,
    limit: 3,
    storageClient: redis,
    onLimitExceeded: async (ctx) => {
      await ctx.reply(
        "You are sending too many requests! Please wait before sending new one"
      );
    },
    keyGenerator: (ctx) => {
      return ctx.from?.id.toString();
    },
  })
);

pm.use(start);
pm.use(help);
pm.use(weather);
pm.use(weatherNotify);
pm.use(weatherReset);
pm.use(cat);
pm.use(dog);

bot.catch((err) => {
  const ctx = err.ctx;
  console.error(`Error while handling update ${ctx.update.update_id}:`);
  const error = err.error;
  if (error instanceof GrammyError) {
    console.error("Error in request:", error.description);
  } else if (error instanceof HttpError) {
    console.error("Could not contact Telegram:", error);
  } else {
    console.error("Unknown error:", error);
  }
});

bot.start({
  async onStart(botInfo) {
    await postgres.connect();
    await postgres.query(tableQuery);

    const dbWeatherSubscriptions = await postgres.query(getUserNotifications);
    initSubscriptionData(dbWeatherSubscriptions.rows);

    cron.schedule("* * * * *", async () => {
      await sendWeatherNotifications(bot.api);
    });

    console.log(`Logged in as @${botInfo.username}`);
  },
});
