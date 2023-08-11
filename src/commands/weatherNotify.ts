import { Composer } from "grammy";

import { LOCALE } from "@/constants/locale";

import { getCurrentWeather } from "@/features/weather/forecast/getCurrentWeather";
import { registerSubscriber } from "@/features/weather/notify/registerSubscriber";

import { checkWeatherSubscription } from "@/utils/features/checkWeatherSubscription";
import { checkTimeFormat } from "@/utils/time/checkTimeFormat";

export const weatherNotify = new Composer();

weatherNotify.command("weathernotify", async (ctx) => {
  const userID = ctx.from?.id;
  if (!userID) {
    return ctx.reply(LOCALE.general.noUserID);
  }

  if (checkWeatherSubscription(userID)) {
    return ctx.reply(LOCALE.weather.alreadySubscribed, {
      parse_mode: "MarkdownV2",
    });
  }

  const params = ctx.msg.text.split(" ");
  if (params.length === 1) {
    return ctx.reply(LOCALE.weather.subscribeHelp, {
      parse_mode: "MarkdownV2",
    });
  }

  const [time, ...weatherCity] = params.slice(1);
  const city = weatherCity.join(" ");

  if (!checkTimeFormat(time)) {
    return ctx.reply(LOCALE.weather.incorrectSubscribeTime, {
      parse_mode: "MarkdownV2",
    });
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
