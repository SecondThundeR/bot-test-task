import { COMMANDS_DATA } from "./commandsData";

const COMMANDS_LIST = COMMANDS_DATA.map(
  (commandData) => `/${commandData.command} - ${commandData.description}`,
);

export const LOCALE = {
  start: "Welcome! To get more info about functionality, type /help",
  help: "Available bot commands:\n" + COMMANDS_LIST.join("\n"),
  weather: {
    noCity:
      'Provide city to get weather for. Example: "Moscow", "Kiev", "Minsk", etc. ',
    noData: "Failed to get weather data, as API returned nothing :c",
    result: (name: string, condition: string, temp: number) =>
      `*Current weather in ${name}*\nCondition: ${condition}\nTemperature: ${temp}°C`,
    alreadySubscribed:
      "You are already subscribed\\! Use `/weatherreset` to remove subscription",
    notSubscribed:
      "You aren't subscribed\\! Use `/weathernotify` to set subscription",
    subscribeHelp:
      "To get daily forecasts, use `/weathernotify <time> <city>`\n\\(e\\.g\\. `/weathernotify 12:00 Moscow`\\)",
    incorrectSubscribeTime:
      "Incorrect time format\\. Make sure to enter it in format, like `12:00`, `00:30`, etc\\.",
    successfullySubscribed: (city: string, time: string) =>
      `You have been subscribed successfully\\! You will recieve your daily forecasts for "${city}" at "${time}"`,
    successfullyUnsubscribed:
      "You have been unsubscribed successfully! You won't recieve your daily forecasts anymore",
    failedFetch: "Failed to find weather data in passed location",
  },
  cat: {
    noData:
      "Failed to get random cat image, as API returned nothing. Sorry about that :c",
    failedFetch: "Failed to fetch random cat!",
  },
  dog: {
    noData:
      "Failed to get random dog image, as API returned nothing. Sorry about that :c",
    failedFetch: "Failed to fetch random dog!",
  },
  general: {
    noUserID: "Can't get userID!",
    failedParse: "Failed to process data. Contact developer to get support",
    hitRateLimit:
      "You are sending too many requests! Please wait before sending new one",
  },
} as const;
