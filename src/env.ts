import { createEnv } from "@t3-oss/env-core";
import { z } from "zod";

export const env = createEnv({
  server: {
    BOT_TOKEN: z.string().length(46, {
      message: "Bot token should have length of 46 characters",
    }),
    PGDATABASE: z.string(),
    PGHOST: z.string(),
    PGPASSWORD: z.string(),
    PGPORT: z.number(),
    PGUSER: z.string(),
    WEATHER_API_KEY: z.string(),
    CAT_API_KEY: z.string(),
    DOG_API_KEY: z.string(),
  },
  runtimeEnv: {
    BOT_TOKEN: process.env.BOT_TOKEN,
    PGDATABASE: process.env.PGDATABASE,
    PGHOST: process.env.PGHOST,
    PGPASSWORD: process.env.PGPASSWORD,
    PGPORT: Number(process.env.PGPORT),
    PGUSER: process.env.PGUSER,
    WEATHER_API_KEY: process.env.WEATHER_API_KEY,
    CAT_API_KEY: process.env.CAT_API_KEY,
    DOG_API_KEY: process.env.DOG_API_KEY,
  },
});
