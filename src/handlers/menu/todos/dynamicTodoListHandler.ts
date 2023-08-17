import { type MenuRange } from "@grammyjs/menu";

import { LOCALE } from "@/constants/locale";
import { OFFSET_STEP } from "@/constants/offsetStep";

import { type BotContext } from "@/types/bot";

import { isTodoNotificationSet } from "@/utils/store/isTodoNotificationSet";

import { todoElementHandler } from "./todoElementHandler";

export function dynamicTodoListHandler(
  ctx: BotContext,
  range: MenuRange<BotContext>,
) {
  const { currentOffset, currentTodoList } = ctx.session;
  if (!currentTodoList) return;

  const newOffset = currentOffset + OFFSET_STEP;

  for (let index = currentOffset; index < newOffset; index++) {
    const todo = currentTodoList[index];
    if (!todo) return;

    const { text, done } = todo;
    const hasNotification = isTodoNotificationSet(todo);

    range
      .text(
        LOCALE.todos.todoElementText(index, text, hasNotification, done),
        async (ctx) => await todoElementHandler(ctx, todo),
      )
      .row();
  }
}
