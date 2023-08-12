import { REMOVE_WEATHER_NOTIFICATION } from "@/constants/postgresQueries";

import { deleteSubscriptionData } from "@/store/weather/subscriptions";

import { postgres } from "@/bot";

export async function removeSubscriber(userID: number) {
  await postgres.query(REMOVE_WEATHER_NOTIFICATION, [userID]);
  deleteSubscriptionData(userID);
}
