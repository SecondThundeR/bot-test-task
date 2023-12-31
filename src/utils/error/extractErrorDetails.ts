import { AxiosError } from "axios";
import { ZodError } from "zod";

import { LOCALE } from "@/constants/locale";

export function extractErrorDetails(
  error: unknown,
  failedRequestMessage?: string,
) {
  if (error instanceof AxiosError) {
    return failedRequestMessage ?? LOCALE.general.axiosGenericMessage;
  }
  if (error instanceof ZodError) {
    return LOCALE.general.failedParse;
  }
  return (error as Error).message;
}
