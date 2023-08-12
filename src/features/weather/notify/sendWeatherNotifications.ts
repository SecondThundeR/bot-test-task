import { type Api, type RawApi } from "grammy";

import { LOCALE } from "@/constants/locale";

import { getCurrentWeather } from "@/features/weather/forecast/getCurrentWeather";

import { subscriptions } from "@/store/weather/subscriptions";

export async function sendWeatherNotifications(api: Api<RawApi>) {
  if (subscriptions.length === 0) return;
  const currentDate = new Date();

  for (const subscription of subscriptions) {
    const { userID, city, time } = subscription;
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

    const { name } = weatherData.location;
    const { condition, temp_c } = weatherData.current;
    await api.sendMessage(
      userID,
      LOCALE.weather.result(name, condition.text, temp_c),
      {
        parse_mode: "MarkdownV2",
      },
    );
  }
}
