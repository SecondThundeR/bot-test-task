import { Menu } from "@grammyjs/menu";

import { LOCALE } from "@/constants/locale";

import { closeMenuHandler } from "@/handlers/menu/todos/closeMenuHandler";
import { createNewTodoHandler } from "@/handlers/menu/todos/createNewTodoHandler";
import { dynamicTodoListHandler } from "@/handlers/menu/todos/dynamicTodoListHandler";
import { fingerprintHandler } from "@/handlers/menu/todos/fingerprintHandler";
import { nextPageHandler } from "@/handlers/menu/todos/nextPageHandler";
import { onMenuOutdatedHandler } from "@/handlers/menu/todos/onMenuOutdatedHandler";
import { previousPageHandler } from "@/handlers/menu/todos/previousPageHandler";

import { type BotContext } from "@/types/bot";

import { todoMenu } from "./todoMenu";

export const todosMenu = new Menu<BotContext>("todos-menu", {
  fingerprint: fingerprintHandler,
  onMenuOutdated: onMenuOutdatedHandler,
  autoAnswer: false,
})
  .dynamic(dynamicTodoListHandler)
  .row()
  .text(LOCALE.menu.createNewTodo, createNewTodoHandler)
  .row()
  .text(LOCALE.menu.prev, previousPageHandler)
  .text(LOCALE.menu.next, nextPageHandler)
  .row()
  .text(LOCALE.menu.closeMenu, closeMenuHandler);

todosMenu.register(todoMenu);
