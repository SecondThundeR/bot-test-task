import { LOCALE } from "@/constants/locale";

import { getCurrentWeather } from "@/features/weather/getCurrentWeather";

import { failRetryHandler } from "@/handlers/conversation/failRetryHandler";

import { type BotContext, type BotConversation } from "@/types/bot";

import { hasCommandEntities } from "@/utils/grammy/hasCommandEntities";

export async function getWeather(
  conversation: BotConversation,
  ctx: BotContext,
) {
  await ctx.reply(`${LOCALE.weather.enterCity}\n${LOCALE.general.cancelTip}`, {
    parse_mode: "MarkdownV2",
  });

  const result = await failRetryHandler(ctx, conversation, {
    otherwiseText: LOCALE.weather.nonText,
    failText: LOCALE.weather.nonText,
    onCheck(msg) {
      return !hasCommandEntities(msg);
    },
  });
  if (result.status === "failed") return;

  try {
    const weatherData = await conversation.external(() =>
      getCurrentWeather(result.value),
    );

    if (!weatherData) {
      return ctx.reply(LOCALE.weather.noData);
    }

    const { condition, temp_c } = weatherData.current;
    const { name } = weatherData.location;

    return ctx.reply(LOCALE.weather.result(name, condition.text, temp_c), {
      parse_mode: "HTML",
    });
  } catch (error: unknown) {
    return ctx.reply((error as Error).message);
  }
}
