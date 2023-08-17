import { Menu } from "@grammyjs/menu";

import {
  SET_TODO_NOTIFICATION,
  SET_TODO_TEXT,
} from "@/constants/conversationIds";
import { LOCALE } from "@/constants/locale";
import { OFFSET_STEP } from "@/constants/offsetStep";

import { deleteTodo } from "@/features/todos/deleteTodo";
import { resetTodoNotificationDate } from "@/features/todos/resetTodoNotificationDate";
import { updateTodoDone } from "@/features/todos/updateTodoDone";

import { type BotContext } from "@/types/bot";

import { isTodoNotificationSet } from "@/utils/store/isTodoNotificationSet";

export const todoMenu = new Menu<BotContext>("todo-menu")
  .text((ctx) => `${LOCALE.menu.selected}${ctx.session.selectedTodo!.text}`)
  .row()
  .text(
    (ctx) => {
      return LOCALE.todos.manageNotificationText(ctx.session.selectedTodo!);
    },
    async (ctx) => {
      const { selectedTodo } = ctx.session;

      if (isTodoNotificationSet(selectedTodo!)) {
        const userID = ctx.from.id;
        await resetTodoNotificationDate(selectedTodo!.id, userID);
        return ctx.menu.update();
      }

      await ctx.deleteMessage();
      await ctx.conversation.enter(SET_TODO_NOTIFICATION);
    },
  )
  .row()
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
  .text(LOCALE.menu.updateText, async (ctx) => {
    await ctx.deleteMessage();
    await ctx.conversation.enter(SET_TODO_TEXT);
  })
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
