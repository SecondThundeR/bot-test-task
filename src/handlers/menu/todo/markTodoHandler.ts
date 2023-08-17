import { LOCALE } from "@/constants/locale";

import { updateTodoDone } from "@/features/todos/updateTodoDone";

import { type MenuBotContext } from "@/types/bot";

export async function markTodoHandler(ctx: MenuBotContext) {
  const { selectedTodo } = ctx.session;
  const todoID = selectedTodo?.id;
  const todoStatus = selectedTodo?.done;
  const userID = ctx.from?.id;
  console.log(todoID, todoStatus, userID);
  if (!todoID || todoStatus === undefined || !userID)
    return ctx.answerCallbackQuery({
      text: LOCALE.todos.manipulateError,
      show_alert: true,
    });

  await ctx.answerCallbackQuery();

  const newTodoStatus = !todoStatus;
  await updateTodoDone(todoID, userID, newTodoStatus);

  ctx.session.selectedTodo!.done = newTodoStatus;
  ctx.menu.update();
}
