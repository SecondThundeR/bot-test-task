import { Composer } from "grammy";

import { LOCALE } from "@/constants/locale";

import { removeSubscriber } from "@/features/weather/notify/removeSubscriber";

import { hasSubscriptionData } from "@/store/weather/subscriptions";

export const weatherReset = new Composer();

weatherReset.command("weatherreset", async (ctx) => {
  const userID = ctx.from?.id;
  if (!userID) {
    return ctx.reply(LOCALE.general.noUserID);
  }

  if (!hasSubscriptionData(userID)) {
    return ctx.reply(LOCALE.weather.notSubscribed, {
      parse_mode: "MarkdownV2",
    });
  }

  await removeSubscriber(userID);

  return ctx.reply(LOCALE.weather.successfullyUnsubscribed);
});
