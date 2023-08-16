import { FAILED_ATTEMPTS_THRESHOLD } from "@/constants/failedAttemptsThreshold";
import { LOCALE } from "@/constants/locale";

import { getCurrentWeather } from "@/features/weather/forecast/getCurrentWeather";
import { registerSubscriber } from "@/features/weather/notify/registerSubscriber";

import { hasSubscriptionData } from "@/store/weather/subscriptions";

import { type BotContext, type BotConversation } from "@/types/bot";

import { checkTimeFormat } from "@/utils/checkTimeFormat";
import { hasCommandEntities } from "@/utils/hasCommandEntities";

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

  let failedAttempts = 0;
  let subscriptionTime: string, subscriptionCity: string;
  await ctx.reply(
    `${LOCALE.weatherNotify.subscriptionTimeHelp}\n${LOCALE.general.cancelTip}`,
    {
      parse_mode: "MarkdownV2",
    },
  );

  while (true) {
    const message = await conversation.waitFor("message:text", {
      otherwise: async (ctx) => {
        await ctx.reply(LOCALE.weatherNotify.subscriptionTimeHelp, {
          parse_mode: "MarkdownV2",
        });
      },
    });
    if (message.hasCommand("cancel")) return ctx.reply(LOCALE.general.canceled);

    const { msg: timeMessage } = message;
    if (!hasCommandEntities(timeMessage) && checkTimeFormat(timeMessage.text)) {
      subscriptionTime = timeMessage.text;
      break;
    }

    failedAttempts++;

    if (failedAttempts >= FAILED_ATTEMPTS_THRESHOLD)
      return ctx.reply(LOCALE.general.failedConversation);

    await ctx.reply(LOCALE.weatherNotify.incorrectSubscribeTime, {
      parse_mode: "MarkdownV2",
    });
  }

  failedAttempts = 0;
  await ctx.reply(`${LOCALE.weather.enterCity}\n${LOCALE.general.cancelTip}`, {
    parse_mode: "MarkdownV2",
  });

  while (true) {
    const message = await conversation.waitFor("message:text", {
      otherwise: async (ctx) => {
        await ctx.reply(LOCALE.weather.enterCity);
      },
    });
    if (message.hasCommand("cancel")) return ctx.reply(LOCALE.general.canceled);

    const { msg: cityMessage } = message;
    if (!hasCommandEntities(cityMessage)) {
      const weatherData = await conversation.external(() =>
        getCurrentWeather(cityMessage.text),
      );
      if (weatherData && typeof weatherData !== "string") {
        subscriptionCity = cityMessage.text;
        break;
      }
    }

    failedAttempts++;

    if (failedAttempts >= FAILED_ATTEMPTS_THRESHOLD)
      return ctx.reply(LOCALE.general.failedConversation);

    await ctx.reply(LOCALE.weather.nonText, {
      parse_mode: "MarkdownV2",
    });
  }

  await registerSubscriber(userID, subscriptionCity, subscriptionTime);
  return ctx.reply(
    LOCALE.weatherNotify.successfullySubscribed(
      subscriptionCity,
      subscriptionTime,
    ),
    {
      parse_mode: "MarkdownV2",
    },
  );
}
