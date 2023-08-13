import { COMMANDS_DATA } from "./commandsData";

const COMMANDS_LIST = COMMANDS_DATA.map(
  (commandData) => `/${commandData.command} - ${commandData.description}`,
);

export const LOCALE = {
  start: "Welcome! To get more info about functionality, type /help",
  help: "Available bot commands:\n" + COMMANDS_LIST.join("\n"),
  weather: {
    enterCity:
      'Provide city to get weather for. Example: "Moscow", "Kiev", "Minsk", etc.',
    botCommand:
      "Please provide something other than bot command as weather city",
    nonText: "Provide city to get weather for",
    noData: "Failed to get weather data, as API returned nothing :c",
    result: (name: string, condition: string, temp: number) =>
      `<b>Current weather in ${name}</b>\nCondition: ${condition}\nTemperature: ${temp}°C`,
    failedFetch: "Failed to find weather data in passed location",
  },
  weatherNotify: {
    botCommandTime:
      "Please provide something other than bot command as subscription time",
    botCommandCity:
      "Please provide something other than bot command as weather city",
    subscriptionTimeHelp:
      "Enter time for daily subscription, like `12:00`, `00:30`, etc",
    incorrectSubscribeTime:
      "Incorrect time format\\. Make sure to enter it in format, like `12:00`, `00:30`, etc\\.",
    alreadySubscribed:
      "You are already subscribed\\! Use `/weatherreset` to remove subscription",
    notSubscribed:
      "You aren't subscribed\\! Use `/weathernotify` to set subscription",
    successfullySubscribed: (city: string, time: string) =>
      `You have been subscribed successfully\\! You will recieve your daily forecasts for "${city}" at "${time}"`,
    successfullyUnsubscribed:
      "You have been unsubscribed successfully! You won't recieve your daily forecasts anymore",
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
    failedConversation:
      "Looks like you have problems filling in the necessary data. Try again or contact developer if you think this is not your issue",
  },
} as const;
