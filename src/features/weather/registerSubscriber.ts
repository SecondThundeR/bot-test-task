import { LOCALE } from "@/constants/locale";
import { SET_WEATHER_NOTIFICATION } from "@/constants/postgresQueries";

import { setSubscriptionData } from "@/store/weather/subscriptions";

import { postgres } from "@/bot";

export async function registerSubscriber(
  userID: number,
  city: string,
  time: string,
) {
  try {
    await postgres.query(SET_WEATHER_NOTIFICATION, [userID, city, time]);
    setSubscriptionData(userID, city, time);
  } catch (error: unknown) {
    console.error(
      LOCALE.weatherNotify.subscribeFailed,
      (error as Error).message,
    );
  }
}
