import { ZodError } from "zod";
import { AxiosError } from "axios";

import { LOCALE } from "@/constants/locale";

export function processError(error: unknown, failedRequestMessage: string) {
  if (error instanceof AxiosError) {
    return failedRequestMessage;
  }
  if (error instanceof ZodError) {
    return LOCALE.general.failedParse;
  }
  return (error as Error).message;
}
