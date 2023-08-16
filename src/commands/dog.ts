import { Composer } from "grammy";

import { LOCALE } from "@/constants/locale";

import { getRandomDog } from "@/features/dog/getRandomDog";

import { isEmptyObject } from "@/utils/isEmptyObject";

export const dog = new Composer();

dog.command("dog", async (ctx) => {
  const dogData = await getRandomDog();
  if (isEmptyObject(dogData)) return ctx.reply(LOCALE.dog.noData);

  const dogURL = dogData.at(0)?.url;
  if (!dogURL) return ctx.reply(LOCALE.dog.noData);

  return ctx.replyWithPhoto(dogURL);
});
