import { postgres } from "@/bot";

import { REMOVE_WEATHER_NOTIFICATION } from "@/constants/postgresQueries";

import { deleteSubscriptionData } from "@/store/weather/subscriptions";

export async function removeSubscriber(userID: number) {
  await postgres.query(REMOVE_WEATHER_NOTIFICATION, [userID]);
  deleteSubscriptionData(userID);
}
