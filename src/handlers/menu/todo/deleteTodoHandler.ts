import { LOCALE } from "@/constants/locale";
import { OFFSET_STEP } from "@/constants/offsetStep";

import { deleteTodo } from "@/features/todos/deleteTodo";

import { type MenuBotContext } from "@/types/bot";

export async function deleteTodoHandler(ctx: MenuBotContext) {
  const { selectedTodo, currentTodoList, currentOffset } = ctx.session;
  const todoID = selectedTodo?.id;
  const userID = ctx.from?.id;
  if (!todoID || !userID)
    return ctx.answerCallbackQuery({
      text: LOCALE.todos.manipulateError,
      show_alert: true,
    });

  await ctx.answerCallbackQuery();
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
