import { Composer } from "grammy";

import { getCurrentWeather } from "@/features/weather/forecast/getCurrentWeather";
import { registerSubscriber } from "@/features/weather/notify/registerSubscriber";

import { checkWeatherSubscription } from "@/utils/features/checkWeatherSubscription";
import { checkTimeFormat } from "@/utils/time/checkTimeFormat";

export const weatherNotify = new Composer();

weatherNotify.command("weathernotify", async (ctx) => {
  const userID = ctx.from?.id;
  if (!userID) {
    return ctx.reply("Can't get userID!");
  }

  if (checkWeatherSubscription(userID)) {
    return ctx.reply(
      "You are already subscribed\\! Use `/weatherReset` to remove subscription",
      {
        parse_mode: "MarkdownV2",
      }
    );
  }

  const params = ctx.msg.text.split(" ");
  if (params.length === 1) {
    return ctx.reply(
      "To get daily forecasts, use `/weatherNotify <city> <time>`\n\\(e\\.g\\. `/weatherNotify Moscow 12:00`\\)",
      {
        parse_mode: "MarkdownV2",
      }
    );
  }

  const [weatherCity, time] = params.slice(1, 3);

  const weatherData = await getCurrentWeather(weatherCity);
  if (!weatherData) {
    return ctx.reply("Failed to get weather data, as API returned nothing :c");
  }

  if (typeof weatherData === "string") {
    return ctx.reply(weatherData);
  }

  if (!checkTimeFormat(time)) {
    return ctx.reply(
      "Incorrect time format\\. Make sure to enter it in format, like `12:00`, `00:30`, etc\\.",
      {
        parse_mode: "MarkdownV2",
      }
    );
  }

  await registerSubscriber(userID, weatherCity, time);

  return ctx.reply(
    `You have been subscribed successfully\\! You will recieve your daily forecasts for "${weatherCity}" at "${time}"`,
    {
      parse_mode: "MarkdownV2",
    }
  );
});
