import { Composer } from "grammy";

import { LOCALE } from "@/constants/locale";

export const help = new Composer();

help.command("help", (ctx) => ctx.reply(LOCALE.help));
