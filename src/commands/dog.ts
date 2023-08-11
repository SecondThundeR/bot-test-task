import { Composer } from "grammy";

import { LOCALE } from "@/constants/locale";

import { getRandomDog } from "@/features/dog/getRandomDog";

export const dog = new Composer();

dog.command("dog", async (ctx) => {
  const dogData = await getRandomDog();
  if (!dogData || dogData.length === 0) {
    return ctx.reply(LOCALE.dog.noData);
  }

  const dogURL = dogData[0].url;
  return ctx.replyWithPhoto(dogURL);
});
