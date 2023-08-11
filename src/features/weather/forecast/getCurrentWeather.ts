import axios from "axios";

import { WEATHER_API_ENDPOINT } from "@/constants/endpoints";

import { WeatherResponseSchema } from "@/schemas/weather/weatherSchema";

import { parseResponse } from "@/utils/zod/parseResponse";
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
    return await parseResponse(res.data, WeatherResponseSchema);
  } catch (error: unknown) {
    return processError(
      error,
      "Failed to find weather data in passed location"
    );
  }
}
