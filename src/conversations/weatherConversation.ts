import { LOCALE } from "@/constants/locale";

import { getCurrentWeather } from "@/features/weather/forecast/getCurrentWeather";

import { type BotContext, type BotConversation } from "@/types/bot";

import { hasCommandEntities } from "@/utils/message/hasCommandEntities";

const WAIT_FOR_MS = 10000;

export async function weatherConversation(
  conversation: BotConversation,
  ctx: BotContext,
) {
  await ctx.reply(LOCALE.weather.enterCity);

  const { msg: message } = await conversation.waitFor("message:text", {
    maxMilliseconds: WAIT_FOR_MS,
    otherwise: async (ctx) => {
      await ctx.reply(LOCALE.weather.nonText);
    },
  });

  if (hasCommandEntities(message)) {
    return await ctx.reply(LOCALE.weather.botCommand);
  }

  const cityName = message.text;
  const weatherData = await conversation.external(() =>
    getCurrentWeather(cityName),
  );
  if (!weatherData) {
    return await ctx.reply(LOCALE.weather.noData);
  }

  if (typeof weatherData === "string") {
    return await ctx.reply(weatherData);
  }

  const { condition, temp_c } = weatherData.current;
  const { name } = weatherData.location;

  return await ctx.reply(LOCALE.weather.result(name, condition.text, temp_c), {
    parse_mode: "HTML",
  });
}
