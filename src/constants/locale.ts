import { COMMANDS_DATA } from "@/constants/commandsData";

import { type TodoEntry } from "@/store/user/todos";

import { isTodoNotificationSet } from "@/utils/store/isTodoNotificationSet";

const COMMANDS_LIST = COMMANDS_DATA.map(
  (commandData) => `/${commandData.command} - ${commandData.description}`,
);

export const LOCALE = {
  start: "Welcome! To get more info about functionality, type /help",
  help: "Available bot commands:\n" + COMMANDS_LIST.join("\n"),
  weather: {
    enterCity:
      'Provide city to get weather for\\. Example: "Moscow", "Kiev", "Minsk", etc\\.',
    nonText: "Provide city to get weather for",
    noData: "Failed to get weather data, as API returned nothing :c",
    result: (name: string, condition: string, temp: number) =>
      `<b>Current weather in ${name}</b>\nCondition: ${condition}\nTemperature: ${temp}°C`,
    failedFetch: "Failed to find weather data in passed location",
  },
  weatherNotify: {
    subscriptionTimeHelp:
      "Enter time for daily subscription, like `12:00`, `00:30`, etc\\.",
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
  todos: {
    noTodo: "Cannot update text as there is no selected todo",
    enterText: "Enter text for new todo",
    enterNewText: "Enter new text for new todo",
    enterNotificationDate:
      "Enter date when you want to be notified in format, like `12.09.2023 14:55`",
    successfullyCreated: "Successfully created new todo!",
    successfullyUpdated: "Successfully updated todo text!",
    successfullySetNotification: "Successfully set notification for your todo!",
    messageText: "*Todos menu*\nCreate, update and navigate through your todos",
    lastPageAlert: "You are already on the last page!",
    firstPageAlert: "You are already on the first page!",
    manipulateError: "There is an error, while trying to manipulate todo!",
    markAs: (done: boolean) => `Mark as ${done ? "undone" : "done"}`,
    notificationHeader: (multiple: boolean) =>
      `<b>Here ${
        multiple ? "are todos" : "is todo"
      }, that you set for notification</b>\n`,
    manageNotificationText: (todo: TodoEntry) =>
      isTodoNotificationSet(todo)
        ? `Remove notification (${todo.date} ${todo.time})`
        : "Set notification",
    todoElementText: (
      index: number,
      text: string,
      hasNotification: boolean,
      isDone: boolean,
    ) =>
      `${index + 1}. ${text}${hasNotification ? " (🔔)" : ""}${
        isDone ? " ✅" : ""
      }`,
  },
  menu: {
    selected: "Selected: ",
    selectedDetails: (text: string | undefined) =>
      `You are currently inspecting ${
        text ? `todo "${text}"` : "unknown todo"
      } `,
    updateText: "Update text",
    delete: "Delete",
    goBack: "Go back",
    createNewTodo: "Create new todo",
    prev: "<-",
    next: "->",
    closeMenu: "Close menu",
  },
  general: {
    cancelTip: "To cancel, type `/cancel`",
    canceled: "Command canceled!",
    noUserID: "Can't get userID!",
    failedParse: "Failed to process data. Contact developer to get support",
    hitRateLimit:
      "You are sending too many requests! Please wait before sending new one",
    failedConversation:
      "Looks like you have problems filling in the necessary data. Try again or contact developer if you think this is not your issue",
  },
} as const;
