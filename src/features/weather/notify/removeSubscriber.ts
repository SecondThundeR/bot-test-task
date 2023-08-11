import { postgres } from "@/bot";

import { removeUserNotification } from "@/constants/postgresQueries";

import { deleteSubscriptionData } from "@/store/weather/subscriptions";

export async function removeSubscriber(userID: number) {
  await postgres.query(removeUserNotification, [userID]);
  deleteSubscriptionData(userID);
}
