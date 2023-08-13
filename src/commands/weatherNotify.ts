import { Composer } from "grammy";

import { LOCALE } from "@/constants/locale";

import { getCurrentWeather } from "@/features/weather/forecast/getCurrentWeather";
import { registerSubscriber } from "@/features/weather/notify/registerSubscriber";

import { hasSubscriptionData } from "@/store/weather/subscriptions";

import { checkTimeFormat } from "@/utils/time/checkTimeFormat";

export const weatherNotify = new Composer();

weatherNotify.command("weathernotify", async (ctx) => {
  const userID = ctx.from?.id;
  if (!userID) {
    return ctx.reply(LOCALE.general.noUserID);
  }

  if (hasSubscriptionData(userID)) {
    return ctx.reply(LOCALE.weather.alreadySubscribed, {
      parse_mode: "MarkdownV2",
    });
  }

  const params = ctx.match.split(" ");
  if (params.length < 2) {
    return ctx.reply(LOCALE.weather.subscribeHelp, {
      parse_mode: "MarkdownV2",
    });
  }

  const [time, ...weatherCity] = params;
  const city = weatherCity.join(" ");

  if (!checkTimeFormat(time)) {
    return ctx.reply(LOCALE.weather.incorrectSubscribeTime, {
      parse_mode: "MarkdownV2",
    });
  }

  if (!city) {
    return ctx.reply(LOCALE.weather.enterCity);
  }

  const weatherData = await getCurrentWeather(city);
  if (!weatherData) {
    return ctx.reply(LOCALE.weather.noData);
  }

  if (typeof weatherData === "string") {
    return ctx.reply(weatherData);
  }

  await registerSubscriber(userID, city, time);

  return ctx.reply(LOCALE.weather.successfullySubscribed(city, time), {
    parse_mode: "MarkdownV2",
  });
});
