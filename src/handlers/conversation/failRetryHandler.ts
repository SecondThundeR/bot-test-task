import { type Message, type ParseMode } from "grammy/types";

import { FAILED_ATTEMPTS_THRESHOLD } from "@/constants/failedAttemptsThreshold";
import { LOCALE } from "@/constants/locale";

import { type BotContext, type BotConversation } from "@/types/bot";

interface FailRetryHandlerOptions {
  otherwiseText: string;
  otherwiseParseMode?: ParseMode;
  failText: string;
  failTextParseMode?: ParseMode;
  onCheck?: (msg: Message) => boolean;
  onCheckAsync?: (msg: Message) => Promise<boolean>;
}

interface FailRetryHandlerResultFalse {
  status: "failed";
  value: null;
}

interface FailRetryHandlerResultTrue {
  status: "success";
  value: string;
}

type FailRetryHandlerResult =
  | FailRetryHandlerResultFalse
  | FailRetryHandlerResultTrue;

export async function failRetryHandler(
  ctx: BotContext,
  conversation: BotConversation,
  options: FailRetryHandlerOptions,
): Promise<FailRetryHandlerResult> {
  const {
    otherwiseText,
    otherwiseParseMode,
    failText,
    failTextParseMode,
    onCheck,
    onCheckAsync,
  } = options;
  if (!onCheck && !onCheckAsync)
    throw new Error(LOCALE.general.noCheckProvided);
  let failedAttempts = 0;

  while (true) {
    const message = await conversation.waitFor("message:text", {
      otherwise: async (ctx) => {
        await ctx.reply(otherwiseText, {
          parse_mode: otherwiseParseMode,
        });
      },
    });

    if (message.hasCommand("cancel")) {
      await ctx.reply(LOCALE.general.canceled);
      return { status: "failed", value: null };
    }

    if (failedAttempts >= FAILED_ATTEMPTS_THRESHOLD) {
      await ctx.reply(LOCALE.general.failedConversation);
      return { status: "failed", value: null };
    }

    const { msg } = message;
    const messageCheckAsync = onCheckAsync && (await onCheckAsync(msg));
    const messageCheckSync = onCheck && onCheck(msg);
    if (messageCheckAsync ?? messageCheckSync)
      return { status: "success", value: msg.text };

    await ctx.reply(failText, {
      parse_mode: failTextParseMode,
    });
    failedAttempts++;
  }
}
