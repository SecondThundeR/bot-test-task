import { LOCALE } from "@/constants/locale";

import { getCurrentWeather } from "@/features/weather/getCurrentWeather";
import { registerSubscriber } from "@/features/weather/registerSubscriber";

import { failRetryHandler } from "@/handlers/conversation/failRetryHandler";

import { hasSubscriptionData } from "@/store/weather/subscriptions";

import { type BotContext, type BotConversation } from "@/types/bot";

import { isValidTime } from "@/utils/date/isValidTime";
import { hasCommandEntities } from "@/utils/grammy/hasCommandEntities";

export async function setWeatherNotification(
  conversation: BotConversation,
  ctx: BotContext,
) {
  const userID = ctx.from?.id;
  if (!userID) {
    return ctx.reply(LOCALE.general.noUserID);
  }

  if (hasSubscriptionData(userID)) {
    return ctx.reply(LOCALE.weatherNotify.alreadySubscribed, {
      parse_mode: "MarkdownV2",
    });
  }

  await ctx.reply(
    `${LOCALE.weatherNotify.subscriptionTimeHelp}\n${LOCALE.general.cancelTip}`,
    {
      parse_mode: "MarkdownV2",
    },
  );

  const subscriptionTimeResult = await failRetryHandler(ctx, conversation, {
    otherwiseText: LOCALE.weatherNotify.subscriptionTimeHelp,
    otherwiseParseMode: "MarkdownV2",
    failText: LOCALE.weatherNotify.incorrectSubscribeTime,
    failTextParseMode: "MarkdownV2",
    onCheck(msg) {
      return msg.text
        ? !hasCommandEntities(msg) && isValidTime(msg.text)
        : false;
    },
  });
  if (subscriptionTimeResult.status === "failed") return;

  await ctx.reply(`${LOCALE.weather.enterCity}\n${LOCALE.general.cancelTip}`, {
    parse_mode: "MarkdownV2",
  });

  const subscriptionCityResult = await failRetryHandler(ctx, conversation, {
    otherwiseText: LOCALE.weather.enterCity,
    failText: LOCALE.weather.nonText,
    onCheckAsync: async (msg) => {
      if (!msg.text || hasCommandEntities(msg)) return false;
      const cityName = msg.text;
      try {
        const weatherData = await conversation.external(() =>
          getCurrentWeather(cityName),
        );
        if (weatherData) return true;
      } catch (error: unknown) {
        console.error(
          LOCALE.weatherNotify.conversationError,
          (error as Error).message,
        );
      }
      return false;
    },
  });
  if (subscriptionCityResult.status === "failed") return;

  const status = await registerSubscriber(
    userID,
    subscriptionCityResult.value,
    subscriptionTimeResult.value,
  );
  if (!status) return ctx.reply(LOCALE.weatherNotify.subscribeFailed);
  return ctx.reply(
    LOCALE.weatherNotify.successfullySubscribed(
      subscriptionCityResult.value,
      subscriptionTimeResult.value,
    ),
    {
      parse_mode: "MarkdownV2",
    },
  );
}
