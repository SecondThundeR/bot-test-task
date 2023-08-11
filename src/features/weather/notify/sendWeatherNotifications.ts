import { Api, RawApi } from "grammy";

import { getCurrentWeather } from "@/features/weather/forecast/getCurrentWeather";

import { subscriptions } from "@/store/weather/subscriptions";

export async function sendWeatherNotifications(api: Api<RawApi>) {
  if (subscriptions.length === 0) return;
  const currentDate = new Date();

  subscriptions.map((notification) => {
    const { userID, city, time } = notification;
    const [hours, minutes] = time.split(":");
    if (
      +hours === currentDate.getHours() &&
      +minutes === currentDate.getMinutes()
    ) {
      let messageText: string;

      getCurrentWeather(city).then((weatherData) => {
        if (typeof weatherData === "string") {
          messageText = weatherData;
        } else {
          const { condition, temp_c } = weatherData.current;
          messageText = `*Daily forecast for ${city}*\nCondition: ${condition.text}\nTemperature: ${temp_c}°C`;
        }
        api.sendMessage(userID, messageText, {
          parse_mode: "MarkdownV2",
        });
      });
    }
  });
}
