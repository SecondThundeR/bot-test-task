import "dotenv/config";
import { Bot } from "grammy";

import { cat } from "@/commands/cat";
import { dog } from "@/commands/dog";
import { start } from "@/commands/start";
import { help } from "@/commands/help";
import { weather } from "@/commands/weather";
import { commandsData } from "@/constants/commandsData";

if (!process.env.BOT_TOKEN) {
  console.error("Bot token is empty!");
  process.exit(1);
}

const bot = new Bot(process.env.BOT_TOKEN);

bot.api.setMyCommands(commandsData);

bot.use(start);
bot.use(help);
bot.use(weather);
bot.use(cat);
bot.use(dog);

bot.start();
