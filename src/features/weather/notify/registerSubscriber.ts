import { postgres } from "@/bot";

import { SET_WEATHER_NOTIFICATION } from "@/constants/postgresQueries";

import { setSubscriptionData } from "@/store/weather/subscriptions";

export async function registerSubscriber(
  userID: number,
  city: string,
  time: string
) {
  await postgres.query(SET_WEATHER_NOTIFICATION, [userID, city, time]);
  setSubscriptionData(userID, city, time);
}
