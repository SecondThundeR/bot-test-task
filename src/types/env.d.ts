export {};

declare global {
  namespace NodeJS {
    interface ProcessEnv {
      BOT_TOKEN: string;
      WEATHER_API_KEY: string;
      CAT_API_KEY: string;
      DOG_API_KEY: string;
    }
  }
}
