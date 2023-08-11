import { hasSubscriptionData } from "@/store/weather/subscriptions";

export function checkWeatherSubscription(userID: number) {
  return hasSubscriptionData(userID);
}
