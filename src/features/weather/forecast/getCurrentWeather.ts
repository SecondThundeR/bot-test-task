import axios from "axios";

import { WEATHER_API_ENDPOINT } from "@/constants/endpoints";
import { LOCALE } from "@/constants/locale";

import { WeatherResponseSchema } from "@/schemas/weather/weatherSchema";

import { processError } from "@/utils/processError";

import { env } from "@/env";

export async function getCurrentWeather(city: string) {
  try {
    const res = await axios.get(WEATHER_API_ENDPOINT, {
      params: {
        key: env.WEATHER_API_KEY,
        q: city,
        aqi: "no",
      },
    });
    return WeatherResponseSchema.parseAsync(res.data);
  } catch (error: unknown) {
    return processError(error, LOCALE.weather.failedFetch);
  }
}
