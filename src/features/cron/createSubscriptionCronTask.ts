import { type Api } from "grammy";
import cron from "node-cron";

import { sendWeatherNotifications } from "@/features/weather/notify/sendWeatherNotifications";

export function createSubscriptionCronTask(api: Api) {
  cron.schedule("* * * * *", async () => {
    await sendWeatherNotifications(api);
  });
}
