import { Composer } from "grammy";

import { LOCALE } from "@/constants/locale";

import { getCurrentWeather } from "@/features/weather/forecast/getCurrentWeather";

export const weather = new Composer();

weather.command("weather", async (ctx) => {
  const weatherCity = ctx.match;
  if (!weatherCity) {
    return ctx.reply(LOCALE.weather.noCity);
  }

  const weatherData = await getCurrentWeather(weatherCity);
  if (!weatherData) {
    return ctx.reply(LOCALE.weather.noData);
  }

  if (typeof weatherData === "string") {
    return ctx.reply(weatherData);
  }

  const { condition, temp_c } = weatherData.current;
  const { name } = weatherData.location;

  return ctx.reply(LOCALE.weather.result(name, condition.text, temp_c), {
    parse_mode: "MarkdownV2",
  });
});
