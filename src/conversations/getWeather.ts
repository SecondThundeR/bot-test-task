import { FAILED_ATTEMPTS_THRESHOLD } from "@/constants/failedAttemptsThreshold";
import { LOCALE } from "@/constants/locale";

import { getCurrentWeather } from "@/features/weather/getCurrentWeather";

import { type BotContext, type BotConversation } from "@/types/bot";

import { hasCommandEntities } from "@/utils/grammy/hasCommandEntities";

export async function getWeather(
  conversation: BotConversation,
  ctx: BotContext,
) {
  await ctx.reply(`${LOCALE.weather.enterCity}\n${LOCALE.general.cancelTip}`, {
    parse_mode: "MarkdownV2",
  });

  let failedAttempts = 0,
    cityName: string;

  while (true) {
    const message = await conversation.waitFor("message:text", {
      otherwise: async (ctx) => {
        await ctx.reply(LOCALE.weather.nonText);
      },
    });
    if (message.hasCommand("cancel")) return ctx.reply(LOCALE.general.canceled);

    const { msg } = message;
    if (!hasCommandEntities(msg)) {
      cityName = msg.text;
      break;
    }

    failedAttempts++;

    if (failedAttempts >= FAILED_ATTEMPTS_THRESHOLD)
      return ctx.reply(LOCALE.general.failedConversation);

    await ctx.reply(LOCALE.weather.nonText);
  }

  try {
    const weatherData = await conversation.external(() =>
      getCurrentWeather(cityName),
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
