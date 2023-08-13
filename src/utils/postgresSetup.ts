import { type Client } from "pg";

import {
  GET_WEATHER_NOTIFICATIONS,
  TABLE_QUERY,
} from "@/constants/postgresQueries";

import {
  initSubscriptionData,
  type Subscription,
} from "@/store/weather/subscriptions";

export async function postgresSetup(postgres: Client) {
  await postgres.connect();
  await postgres.query(TABLE_QUERY);

  const dbWeatherSubscriptions = await postgres.query(
    GET_WEATHER_NOTIFICATIONS,
  );
  initSubscriptionData(dbWeatherSubscriptions.rows as Subscription[]);
}
