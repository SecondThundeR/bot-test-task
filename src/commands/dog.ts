import { Composer } from "grammy";

import { getRandomDog } from "@/features/dog/getRandomDog";

export const dog = new Composer();

dog.command("dog", async (ctx) => {
  const dogData = await getRandomDog();
  if (!dogData || dogData.length === 0) {
    return ctx.reply(
      "Failed to get random dog image, as API returned nothing. Sorry about that :c"
    );
  }

  const dogURL = dogData[0].url;
  return ctx.replyWithPhoto(dogURL);
});
