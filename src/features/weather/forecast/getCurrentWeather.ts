import axios from "axios";

import { WEATHER_API_ENDPOINT } from "@/constants/endpoints";
import { LOCALE } from "@/constants/locale";

import { WeatherResponseSchema } from "@/schemas/weather/weatherSchema";

import { processError } from "@/utils/features/processError";

export async function getCurrentWeather(city: string) {
  try {
    const res = await axios.get(WEATHER_API_ENDPOINT, {
      params: {
        key: process.env.WEATHER_API_KEY,
        q: city,
        aqi: "no",
      },
    });
    return await WeatherResponseSchema.parseAsync(res.data);
  } catch (error: unknown) {
    return processError(error, LOCALE.weather.failedFetch);
  }
}
