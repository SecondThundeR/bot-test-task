import { Composer } from "grammy";

import { getRandomCat } from "@/features/cat/getRandomCat";

export const cat = new Composer();

cat.command("cat", async (ctx) => {
  const catData = await getRandomCat();
  if (!catData || catData.length === 0) {
    return ctx.reply(
      "Failed to get random cat image, as API returned nothing. Sorry about that :c"
    );
  }

  const catURL = catData[0].url;
  return ctx.replyWithPhoto(catURL);
});
