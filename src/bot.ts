import "dotenv/config";

import { Bot, session } from "grammy";
import { conversations, createConversation } from "@grammyjs/conversations";
import { limit } from "@grammyjs/ratelimiter";
import Redis from "ioredis";
import { Client } from "pg";

import { cat } from "@/commands/cat";
import { dog } from "@/commands/dog";
import { help } from "@/commands/help";
import { start } from "@/commands/start";
import { weather } from "@/commands/weather";
import { weatherNotify } from "@/commands/weatherNotify";
import { weatherReset } from "@/commands/weatherReset";

import { COMMANDS_DATA } from "@/constants/commandsData";
import { LOCALE } from "@/constants/locale";

import { errorHandler } from "@/handlers/bot/errorHandler";
import { onStartHandler } from "@/handlers/bot/onStartHandler";
import { shutdownHandler } from "@/handlers/bot/shutdownHandler";

import { type BotContext } from "@/types/bot";

import { weatherConversation } from "@/conversations/weatherConversation";
import { weatherNotifyConversation } from "@/conversations/weatherNotifyConversation";
import { env } from "@/env";

const redis = new Redis({
  port: env.REDISPORT,
  host: env.REDISHOST,
  username: env.REDISUSER,
  password: env.REDISPASSWORD,
});

export const postgres = new Client({
  host: env.PGHOST,
  port: env.PGPORT,
  database: env.PGDATABASE,
  user: env.PGUSER,
  password: env.PGPASSWORD,
});

const bot = new Bot<BotContext>(env.BOT_TOKEN);
const pm = bot.filter((ctx) => ctx.chat?.type === "private");

bot.api
  .setMyCommands(COMMANDS_DATA, {
    scope: {
      type: "all_private_chats",
    },
  })
  .catch(console.error);

bot.api
  .setMyCommands([], {
    scope: {
      type: "all_group_chats",
    },
  })
  .catch(console.error);

bot.use(
  limit({
    timeFrame: 2000,
    limit: 3,
    storageClient: redis,
    onLimitExceeded: async (ctx) => {
      await ctx.reply(LOCALE.general.hitRateLimit);
    },
    keyGenerator: (ctx) => {
      return ctx.from?.id.toString();
    },
  }),
);

pm.use(
  session({
    initial() {
      return {};
    },
  }),
);
pm.use(conversations());
pm.use(createConversation(weatherConversation));
pm.use(createConversation(weatherNotifyConversation));

pm.use(start);
pm.use(help);
pm.use(weather);
pm.use(weatherNotify);
pm.use(weatherReset);
pm.use(cat);
pm.use(dog);

bot.catch((err) => errorHandler(err));

process.once("SIGINT", () => shutdownHandler(bot, postgres));
process.once("SIGTERM", () => shutdownHandler(bot, postgres));

bot
  .start({
    onStart: async (botInfo) => await onStartHandler(bot, postgres, botInfo),
  })
  .catch(console.error);
