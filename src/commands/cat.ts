import { Composer } from "grammy";

import { LOCALE } from "@/constants/locale";

import { getRandomCat } from "@/features/cat/getRandomCat";

import { isEmptyObject } from "@/utils/general/isEmptyObject";

export const cat = new Composer();

cat.command("cat", async (ctx) => {
  const catData = await getRandomCat();
  if (isEmptyObject(catData)) return ctx.reply(LOCALE.cat.noData);

  const catURL = catData.at(0)?.url;
  if (!catURL) return ctx.reply(LOCALE.cat.noData);

  return ctx.replyWithPhoto(catURL);
});
