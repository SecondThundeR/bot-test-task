import { BotCommand } from "grammy/types";

export const commandsData: BotCommand[] = [
  { command: "start", description: "Start the bot" },
  { command: "help", description: "Show help text" },
  { command: "weather", description: "Get weather data in city" },
  { command: "cat", description: "Get random cat image" },
  { command: "dog", description: "Get random dog image" },
];
