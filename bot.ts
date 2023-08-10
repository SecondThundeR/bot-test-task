import "dotenv/config";
import { Bot } from "grammy";

if (!process.env.BOT_TOKEN) {
  console.error("Bot token is empty!");
  process.exit(1);
}

const bot = new Bot(process.env.BOT_TOKEN);

bot.command("start", (ctx) =>
  ctx.reply("Welcome! To get more info about functionality type /help")
);
bot.command("help", (ctx) =>
  ctx.reply(
    "This bot is used to get info about the weather in your city. To get info type /weather <city>"
  )
);

bot.start();
