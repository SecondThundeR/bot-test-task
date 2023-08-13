import { LOCALE } from "@/constants/locale";

import { getCurrentWeather } from "@/features/weather/forecast/getCurrentWeather";
import { registerSubscriber } from "@/features/weather/notify/registerSubscriber";

import { hasSubscriptionData } from "@/store/weather/subscriptions";

import { type BotContext, type BotConversation } from "@/types/bot";

import { hasCommandEntities } from "@/utils/message/hasCommandEntities";
import { checkTimeFormat } from "@/utils/time/checkTimeFormat";

const FAILED_ATTEMPTS_THRESHOLD = 3;

export async function weatherNotifyConversation(
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
  let subscriptionTime: string;
  await ctx.reply(LOCALE.weatherNotify.subscriptionTimeHelp, {
    parse_mode: "MarkdownV2",
  });

  do {
    console.log("Iteration! Attempts failed:", failedAttempts);
    if (failedAttempts >= FAILED_ATTEMPTS_THRESHOLD) {
      return ctx.reply(LOCALE.general.failedConversation);
    }

    const { msg: timeMessage } = await conversation.waitFor("message:text", {
      otherwise: async (ctx) => {
        failedAttempts++;
        await ctx.reply(LOCALE.weatherNotify.subscriptionTimeHelp);
      },
    });
    if (hasCommandEntities(timeMessage)) {
      failedAttempts++;
      await ctx.reply(LOCALE.weatherNotify.botCommandTime, {
        parse_mode: "MarkdownV2",
      });
      continue;
    }

    subscriptionTime = timeMessage.text;
    if (!checkTimeFormat(subscriptionTime)) {
      failedAttempts++;
      await ctx.reply(LOCALE.weatherNotify.incorrectSubscribeTime, {
        parse_mode: "MarkdownV2",
      });
      continue;
    }
    break;
  } while (true);

  failedAttempts = 0;
  let subscriptionCity: string;
  await ctx.reply(LOCALE.weather.enterCity);

  do {
    if (failedAttempts >= FAILED_ATTEMPTS_THRESHOLD) {
      return ctx.reply(LOCALE.general.failedConversation);
    }

    const { msg: cityMessage } = await conversation.waitFor("message:text", {
      otherwise: async (ctx) => {
        failedAttempts++;
        await ctx.reply(LOCALE.weather.enterCity);
      },
    });
    if (hasCommandEntities(cityMessage)) {
      failedAttempts++;
      await ctx.reply(LOCALE.weatherNotify.botCommandCity, {
        parse_mode: "MarkdownV2",
      });
      continue;
    }

    subscriptionCity = cityMessage.text;
    const weatherData = await conversation.external(() =>
      getCurrentWeather(subscriptionCity),
    );
    if (!weatherData) {
      failedAttempts++;
      await ctx.reply(LOCALE.weather.noData);
      continue;
    }
    if (typeof weatherData === "string") {
      failedAttempts++;
      await ctx.reply(weatherData);
      continue;
    }
    break;
  } while (true);

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
