import { Composer } from "grammy";

import { LOCALE } from "@/constants/locale";

import { getRandomCat } from "@/features/cat/getRandomCat";

export const cat = new Composer();

cat.command("cat", async (ctx) => {
  const catData = await getRandomCat();
  if (!catData || catData.length === 0) {
    return ctx.reply(LOCALE.cat.noData);
  }

  const catURL = catData[0].url;
  return ctx.replyWithPhoto(catURL);
});
