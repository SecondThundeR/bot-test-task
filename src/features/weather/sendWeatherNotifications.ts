import { type Api, type RawApi } from "grammy";

import { LOCALE } from "@/constants/locale";

import { getCurrentWeather } from "@/features/weather/getCurrentWeather";

import { subscriptions } from "@/store/weather/subscriptions";

import { isMatchCurrentTime } from "@/utils/date/isMatchCurrentTime";

export async function sendWeatherNotifications(api: Api<RawApi>, date: Date) {
  if (subscriptions.length === 0) return;

  for (const subscription of subscriptions) {
    const { userID, city, time } = subscription;
    if (!isMatchCurrentTime(time, date)) continue;

    try {
      const weatherData = await getCurrentWeather(city);

      const { name } = weatherData.location;
      const { condition, temp_c } = weatherData.current;
      await api.sendMessage(
        userID,
        LOCALE.weather.result(name, condition.text, temp_c),
        {
          parse_mode: "HTML",
        },
      );
    } catch (error: unknown) {
      await api.sendMessage(
        userID,
        `${LOCALE.weatherNotify.subscriptionSendFailed} ${
          (error as Error).message
        }`,
      );
      continue;
    }
  }
}
