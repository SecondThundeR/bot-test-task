import axios from "axios";

import { DOG_API_ENDPOINT } from "@/constants/endpoints";
import { LOCALE } from "@/constants/locale";

import { CatResponseSchema } from "@/schemas/cat/catSchema";

import { processError } from "@/utils/processError";

import { env } from "@/env";

export async function getRandomDog() {
  try {
    const res = await axios.get(DOG_API_ENDPOINT, {
      headers: {
        "x-api-key": env.DOG_API_KEY,
      },
    });
    return CatResponseSchema.parseAsync(res.data);
  } catch (error: unknown) {
    processError(error, LOCALE.dog.failedFetch);
  }
}
