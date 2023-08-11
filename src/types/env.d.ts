export {};

declare global {
  namespace NodeJS {
    interface ProcessEnv {
      BOT_TOKEN: string;
      REDISHOST: string;
      REDISPASSWORD: string;
      REDISPORT: string;
      REDISUSER: string;
      PGDATABASE: string;
      PGHOST: string;
      PGPASSWORD: string;
      PGPORT: string;
      PGUSER: string;
      WEATHER_API_KEY: string;
      CAT_API_KEY: string;
      DOG_API_KEY: string;
    }
  }
}
