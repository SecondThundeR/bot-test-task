import z from "zod";

export const WeatherResponseSchema = z.object({
  location: z.object({
    name: z.string(),
  }),
  current: z.object({
    temp_c: z.number(),
    condition: z.object({
      text: z.string(),
    }),
  }),
});
