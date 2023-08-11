import { Composer } from "grammy";

import { getCurrentWeather } from "@/features/weather/forecast/getCurrentWeather";

export const weather = new Composer();

weather.command("weather", async (ctx) => {
  const params = ctx.msg.text.split(" ");
  if (params.length < 1) {
    return ctx.reply(
      "Provide city to get weather for\\. Example: `Moscow`, `Kiev`, `Minsk`, etc\\. ",
      {
        parse_mode: "MarkdownV2",
      }
    );
  }
  const weatherCity = params.slice(1).join(" ");
  const weatherData = await getCurrentWeather(weatherCity);
  if (!weatherData) {
    return ctx.reply("Failed to get weather data, as API returned nothing :c");
  }

  if (typeof weatherData === "string") {
    return ctx.reply(weatherData);
  }

  const { condition, temp_c } = weatherData.current;
  const { name } = weatherData.location;

  return ctx.reply(
    `*Current weather in ${name}*\nCondition: ${condition.text}\nTemperature: ${temp_c}°C`,
    {
      parse_mode: "MarkdownV2",
    }
  );
});
