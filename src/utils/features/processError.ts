import { ZodError } from "zod";
import { AxiosError } from "axios";

export function processError(error: unknown, failedRequestMessage: string) {
  if (error instanceof AxiosError) {
    return failedRequestMessage;
  }
  if (error instanceof ZodError) {
    return "Failed to process data. Contact developer to get support";
  }
  return (error as Error).message;
}
