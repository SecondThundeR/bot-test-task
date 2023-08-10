import { Composer } from "grammy";

export const help = new Composer();

help.command("help", (ctx) =>
  ctx.reply(
    "This bot is used to get info about the weather in your city\\. To get info type `/weather <city>`",
    {
      parse_mode: "MarkdownV2",
    }
  )
);
