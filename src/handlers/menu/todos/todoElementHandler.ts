import { type TodoEntry } from "@/store/user/todos";

import { type MenuBotContext } from "@/types/bot";

export async function todoElementHandler(ctx: MenuBotContext, todo: TodoEntry) {
  await ctx.answerCallbackQuery();
  ctx.session.selectedTodo = todo;
  ctx.menu.nav("todo-menu");
}
