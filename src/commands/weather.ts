import { Composer } from "grammy";

import { getCurrentWeather } from "@/features/weather/forecast/getCurrentWeather";

export const weather = new Composer();

weather.command("weather", async (ctx) => {
  const weatherCity = ctx.msg.text.split(" ")?.[1];
  if (!weatherCity) {
    return ctx.reply(
      "Provide city to get weather for\\. Example: `Moscow`, `Kiev`, `Minsk`, etc\\. ",
      {
        parse_mode: "MarkdownV2",
      }
    );
  }
  const weatherData = await getCurrentWeather(weatherCity);
  if (!weatherData) {
    return ctx.reply("Failed to get weather data, as API returned nothing :c");
  }

  if (typeof weatherData === "string") {
    return ctx.reply(weatherData);
  }

  const { condition, temp_c } = weatherData.current;

  return ctx.reply(
    `*Current weather in ${weatherCity}*\nCondition: ${condition.text}\nTemperature: ${temp_c}°C`,
    {
      parse_mode: "MarkdownV2",
    }
  );
});
