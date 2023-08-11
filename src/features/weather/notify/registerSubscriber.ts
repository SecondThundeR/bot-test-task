import { postgres } from "@/bot";

import { setUserNotification } from "@/constants/postgresQueries";

import { setSubscriptionData } from "@/store/weather/subscriptions";

export async function registerSubscriber(
  userID: number,
  city: string,
  time: string
) {
  await postgres.query(setUserNotification, [userID, city, time]);
  setSubscriptionData(userID, city, time);
}
