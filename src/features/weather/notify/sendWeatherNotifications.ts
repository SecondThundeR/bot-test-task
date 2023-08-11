import { Api, RawApi } from "grammy";

import { getCurrentWeather } from "@/features/weather/forecast/getCurrentWeather";

import { subscriptions } from "@/store/weather/subscriptions";

export async function sendWeatherNotifications(api: Api<RawApi>) {
  if (subscriptions.length === 0) return;
  const currentDate = new Date();

  for (let index = 0; index < subscriptions.length; index++) {
    const { userID, city, time } = subscriptions[index];
    const [hours, minutes] = time.split(":");
    if (
      parseInt(hours) !== currentDate.getHours() ||
      parseInt(minutes) !== currentDate.getMinutes()
    )
      continue;

    const weatherData = await getCurrentWeather(city);
    if (typeof weatherData === "string") {
      await api.sendMessage(userID, weatherData);
      continue;
    }

    const { condition, temp_c } = weatherData.current;
    await api.sendMessage(
      userID,
      `*Daily forecast for ${city}*\nCondition: ${condition.text}\nTemperature: ${temp_c}°C`,
      {
        parse_mode: "MarkdownV2",
      }
    );
  }
}
