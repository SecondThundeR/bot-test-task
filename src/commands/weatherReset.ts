import { Composer } from "grammy";

import { removeSubscriber } from "@/features/weather/notify/removeSubscriber";

import { checkWeatherSubscription } from "@/utils/features/checkWeatherSubscription";

export const weatherReset = new Composer();

weatherReset.command("weatherreset", async (ctx) => {
  const userID = ctx.from?.id;
  if (!userID) {
    return ctx.reply("Can't get userID!");
  }

  const isSubscribed = await checkWeatherSubscription(userID);
  if (!isSubscribed) {
    return ctx.reply(
      "You aren't subscribed\\! Use `/weatherNotify` to set subscription",
      {
        parse_mode: "MarkdownV2",
      }
    );
  }

  await removeSubscriber(userID);

  return ctx.reply(
    "You have been unsubscribed successfully! You won't recieve your daily forecasts anymore"
  );
});
