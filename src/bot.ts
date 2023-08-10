import "dotenv/config";
import Redis from "ioredis";
import { Bot } from "grammy";
import { limit } from "@grammyjs/ratelimiter";

import { cat } from "@/commands/cat";
import { dog } from "@/commands/dog";
import { start } from "@/commands/start";
import { help } from "@/commands/help";
import { weather } from "@/commands/weather";
import { commandsData } from "@/constants/commandsData";

const { BOT_TOKEN, REDISPORT, REDISHOST, REDISUSER, REDISPASSWORD } =
  process.env;

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
const bot = new Bot(BOT_TOKEN);

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

bot.use(start);
bot.use(help);
bot.use(weather);
bot.use(cat);
bot.use(dog);

bot.start();
