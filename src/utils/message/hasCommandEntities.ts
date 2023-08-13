import { type Message } from "grammy/types";

export function hasCommandEntities(message: Message) {
  return message.entities?.some((entity) => entity.type === "bot_command");
}
