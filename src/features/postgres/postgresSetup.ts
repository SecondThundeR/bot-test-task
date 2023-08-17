import { type Client } from "pg";

import {
  GET_USERS_TODOS,
  GET_WEATHER_NOTIFICATIONS,
  TABLE_QUERY,
  TODOS_QUERY,
} from "@/constants/postgresQueries";

import { initTodosData, type DBTodo } from "@/store/user/todos";
import {
  initSubscriptionData,
  type Subscription,
} from "@/store/weather/subscriptions";

export async function postgresSetup(postgres: Client) {
  try {
    await postgres.connect();

    await postgres.query(TABLE_QUERY);
    await postgres.query(TODOS_QUERY);

    const dbWeatherSubscriptions = await postgres.query<Subscription>(
      GET_WEATHER_NOTIFICATIONS,
    );
    initSubscriptionData(dbWeatherSubscriptions.rows);

    const dbUserTodos = await postgres.query<DBTodo>(GET_USERS_TODOS);
    initTodosData(dbUserTodos.rows);
  } catch (error: unknown) {
    console.error(error);
    process.exit(1);
  }
}
