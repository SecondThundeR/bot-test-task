import { Menu } from "@grammyjs/menu";

import { LOCALE } from "@/constants/locale";
import { OFFSET_STEP } from "@/constants/offsetStep";

import { deleteTodo } from "@/features/todos/deleteTodo";
import { updateTodoDone } from "@/features/todos/updateTodoDone";

import { type BotContext } from "@/types/bot";

export const todoMenu = new Menu<BotContext>("todo-menu")
  .text((ctx) => `${LOCALE.menu.selected}${ctx.session.selectedTodo!.text}`)
  .row()
  .text(LOCALE.menu.updateText, async (ctx) => {
    await ctx.deleteMessage();
    await ctx.conversation.enter("updateTodoConversation");
  })
  .text(
    (ctx) => {
      const doneStatus = ctx.session.selectedTodo!.done;
      return LOCALE.todos.markAs(doneStatus);
    },
    async (ctx) => {
      const { selectedTodo } = ctx.session;
      const todoID = selectedTodo!.id;
      const newTodoStatus = !selectedTodo!.done;
      const userID = ctx.from.id;

      await updateTodoDone(todoID, userID, newTodoStatus);

      ctx.session.selectedTodo!.done = newTodoStatus;
      ctx.menu.update();
    },
  )
  .text(LOCALE.menu.delete, async (ctx) => {
    const { selectedTodo, currentTodoList } = ctx.session;
    const todoID = selectedTodo!.id;
    const userID = ctx.from.id;

    await deleteTodo(todoID, userID);

    ctx.session.currentTodoList = currentTodoList?.filter(
      (todo) => todo.id !== todoID,
    );
    if (
      ctx.session.currentTodoList &&
      ctx.session.currentOffset >= ctx.session.currentTodoList.length
    ) {
      ctx.session.currentOffset -= OFFSET_STEP;
    }
    ctx.menu.back();
  })
  .row()
  .back(LOCALE.menu.goBack, (ctx) => {
    ctx.session.selectedTodo = null;
  });
