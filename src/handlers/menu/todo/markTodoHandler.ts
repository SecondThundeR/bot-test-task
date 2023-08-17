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
  try {
    await updateTodoDone(todoID, userID, newTodoStatus);
    await ctx.answerCallbackQuery();

    ctx.session.selectedTodo!.done = newTodoStatus;
    return ctx.menu.update();
  } catch (error: unknown) {
    return ctx.answerCallbackQuery({
      text: (error as Error).message,
    });
  }
}
