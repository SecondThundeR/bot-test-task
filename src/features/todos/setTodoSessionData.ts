import { getUserTodos } from "@/store/user/todos";

import { type BotContext } from "@/types/bot";

export function setTodoSessionData(ctx: BotContext, userID: number) {
  ctx.session.currentOffset = 0;
  ctx.session.selectedTodo = null;

  const todos = getUserTodos(userID);
  if (todos) {
    ctx.session.currentTodoList = todos;
  }
}
