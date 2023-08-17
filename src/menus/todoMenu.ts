import { Menu } from "@grammyjs/menu";

import { LOCALE } from "@/constants/locale";

import { deleteTodoHandler } from "@/handlers/menu/todo/deleteTodoHandler";
import { goBackHandler } from "@/handlers/menu/todo/goBackHandler";
import { markTodoHandler } from "@/handlers/menu/todo/markTodoHandler";
import { markTodoTextHandler } from "@/handlers/menu/todo/markTodoTextHandler";
import { notificationTodoHandler } from "@/handlers/menu/todo/notificationTodoHandler";
import { notificationTodoTextHandler } from "@/handlers/menu/todo/notificationTodoTextHandler";
import { selectedTodoTextHandler } from "@/handlers/menu/todo/selectedTodoTextHandler";
import { updateTextHandler } from "@/handlers/menu/todo/updateTextHandler";

import { type BotContext } from "@/types/bot";

export const todoMenu = new Menu<BotContext>("todo-menu")
  .text(selectedTodoTextHandler)
  .row()
  .text(notificationTodoTextHandler, notificationTodoHandler)
  .row()
  .text(markTodoTextHandler, markTodoHandler)
  .text(LOCALE.menu.updateText, updateTextHandler)
  .text(LOCALE.menu.delete, deleteTodoHandler)
  .row()
  .back(LOCALE.menu.goBack, goBackHandler);
