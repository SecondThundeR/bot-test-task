import { type MenuFlavor } from "@grammyjs/menu";

import { OFFSET_STEP } from "@/constants/offsetStep";

import { deleteTodo } from "@/features/todos/deleteTodo";

import { type BotContext } from "@/types/bot";

export async function deleteTodoHandler(ctx: BotContext & MenuFlavor) {
  const { selectedTodo, currentTodoList, currentOffset } = ctx.session;
  const todoID = selectedTodo?.id;
  const userID = ctx.from?.id;
  if (!todoID || !userID) return;

  await deleteTodo(todoID, userID);

  ctx.session.currentTodoList = currentTodoList?.filter(
    (todo) => todo.id !== todoID,
  );
  if (
    ctx.session.currentTodoList &&
    currentOffset >= ctx.session.currentTodoList.length
  ) {
    ctx.session.currentOffset -= OFFSET_STEP;
  }
  ctx.menu.back();
}
