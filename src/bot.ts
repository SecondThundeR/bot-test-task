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
import { todos } from "@/commands/todos";
import { weather } from "@/commands/weather";
import { weatherNotify } from "@/commands/weatherNotify";
import { weatherReset } from "@/commands/weatherReset";

import { COMMANDS_DATA } from "@/constants/commandsData";
import { LOCALE } from "@/constants/locale";

import { createTodo } from "@/conversations/createTodo";
import { getWeather } from "@/conversations/getWeather";
import { setWeatherNotification } from "@/conversations/setWeatherNotification";
import { updateTodoText } from "@/conversations/updateTodoText";

import { errorHandler } from "@/handlers/bot/errorHandler";
import { onStartHandler } from "@/handlers/bot/onStartHandler";
import { shutdownHandler } from "@/handlers/bot/shutdownHandler";

import { todosMenu } from "@/menus/todosMenu";

import { type BotContext } from "@/types/bot";

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
      return {
        currentOffset: 0,
      };
    },
  }),
);

pm.use(conversations());
pm.use(createConversation(createTodo));
pm.use(createConversation(getWeather));
pm.use(createConversation(setWeatherNotification));
pm.use(createConversation(updateTodoText));

pm.use(todosMenu);

pm.use(start);
pm.use(help);
pm.use(weather);
pm.use(weatherNotify);
pm.use(weatherReset);
pm.use(cat);
pm.use(dog);
pm.use(todos);

bot.catch((err) => errorHandler(err));

process.once("SIGINT", () => shutdownHandler(bot, postgres));
process.once("SIGTERM", () => shutdownHandler(bot, postgres));

bot
  .start({
    onStart: async (botInfo) => await onStartHandler(bot, postgres, botInfo),
  })
  .catch(console.error);
