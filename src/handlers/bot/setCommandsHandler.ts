import { type Bot } from "grammy";

import { COMMANDS_DATA } from "@/constants/commandsData";

import { type BotContext } from "@/types/bot";

export async function setCommandsHandler(bot: Bot<BotContext>) {
  await bot.api
    .setMyCommands(COMMANDS_DATA, {
      scope: {
        type: "all_private_chats",
      },
    })
    .catch(console.error);
  await bot.api
    .setMyCommands([], {
      scope: {
        type: "all_group_chats",
      },
    })
    .catch(console.error);
}
