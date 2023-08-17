import { type Context, type SessionFlavor } from "grammy";
import {
  type Conversation,
  type ConversationFlavor,
} from "@grammyjs/conversations";
import { type MenuFlavor } from "@grammyjs/menu";

import { type TodoEntry } from "@/store/user/todos";

interface SessionData {
  currentTodoList?: TodoEntry[] | null;
  selectedTodo?: TodoEntry | null;
  currentOffset: number;
}

export type BotContext = Context &
  ConversationFlavor &
  SessionFlavor<SessionData>;
export type MenuBotContext = BotContext & MenuFlavor;
export type BotConversation = Conversation<BotContext>;
