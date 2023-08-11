import { Composer } from "grammy";

export const start = new Composer();

start.command("start", (ctx) => {
  ctx.reply("Welcome\\! To get more info about functionality, type `/help`", {
    parse_mode: "MarkdownV2",
  });
});
