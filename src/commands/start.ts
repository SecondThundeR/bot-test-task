import { Composer } from "grammy";

import { LOCALE } from "@/constants/locale";

export const start = new Composer();

start.command("start", (ctx) => ctx.reply(LOCALE.start));
