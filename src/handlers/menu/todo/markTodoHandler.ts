import { type MenuFlavor } from "@grammyjs/menu";

import { updateTodoDone } from "@/features/todos/updateTodoDone";

import { type BotContext } from "@/types/bot";

export async function markTodoHandler(ctx: BotContext & MenuFlavor) {
  const { selectedTodo } = ctx.session;
  const todoID = selectedTodo?.id;
  const todoStatus = selectedTodo?.done;
  const userID = ctx.from?.id;
  if (!todoID || !todoStatus || !userID) return;

  const newTodoStatus = !todoStatus;

  await updateTodoDone(todoID, userID, newTodoStatus);

  ctx.session.selectedTodo!.done = newTodoStatus;
  ctx.menu.update();
}
