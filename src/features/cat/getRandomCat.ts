import axios from "axios";

import { CAT_API_ENDPOINT } from "@/constants/endpoints";
import { LOCALE } from "@/constants/locale";

import { CatResponseSchema } from "@/schemas/cat/catSchema";

import { processError } from "@/utils/features/processError";

import { env } from "@/env";

export async function getRandomCat() {
  try {
    const res = await axios.get(CAT_API_ENDPOINT, {
      headers: {
        "x-api-key": env.CAT_API_KEY,
      },
    });
    return await CatResponseSchema.parseAsync(res.data);
  } catch (error: unknown) {
    processError(error, LOCALE.cat.failedFetch);
  }
}
