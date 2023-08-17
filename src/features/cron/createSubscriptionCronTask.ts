import { type Api } from "grammy";
import cron from "node-cron";

import { sendTodosNotifications } from "@/features/todos/sendTodosNotifications";
import { sendWeatherNotifications } from "@/features/weather/sendWeatherNotifications";

export function createSubscriptionCronTask(api: Api) {
  cron.schedule(
    "* * * * *",
    async () => {
      const currentDate = new Date();
      await sendWeatherNotifications(api, currentDate);
      await sendTodosNotifications(api, currentDate);
    },
    {
      name: "Todo notifications and weather subscriptions",
      runOnInit: true,
      timezone: process.env.TZ,
    },
  );
}
