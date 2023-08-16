import { type BotCommand } from "grammy/types";

export const COMMANDS_DATA: BotCommand[] = [
  { command: "start", description: "Start the bot" },
  { command: "help", description: "Show help text" },
  { command: "weather", description: "Get weather data in city" },
  { command: "weathernotify", description: "Subscribe to daily forecasts" },
  { command: "weatherreset", description: "Unsubscribe from daily forecasts" },
  { command: "cat", description: "Get random cat image" },
  { command: "dog", description: "Get random dog image" },
  {
    command: "todos",
    description:
      "Manage todo tasks (create, read, update, delete and/or notify)",
  },
];
