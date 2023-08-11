interface Subscription {
  userID: number;
  city: string;
  time: string;
}

export let subscriptions: Subscription[] = [];

export function initSubscriptionData(initSubscriptions: Subscription[]) {
  subscriptions = [...initSubscriptions];
}

export function hasSubscriptionData(userID: number) {
  return (
    subscriptions.findIndex(
      (subscription) => subscription.userID === userID
    ) !== -1
  );
}

export function getSubscriptionData(userID: number) {
  return subscriptions.find((subscription) => subscription.userID === userID);
}

export function setSubscriptionData(
  userID: number,
  city: string,
  time: string
) {
  subscriptions.push({ userID, city, time });
}

export function deleteSubscriptionData(userID: number) {
  subscriptions = subscriptions.filter(
    (subscription) => subscription.userID !== userID
  );
}
