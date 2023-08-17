import axios from "axios";

import { CAT_API_ENDPOINT } from "@/constants/endpoints";
import { LOCALE } from "@/constants/locale";

import { CatResponseSchema } from "@/schemas/cat/catSchema";

import { extractErrorDetails } from "@/utils/error/extractErrorDetails";

import { env } from "@/env";

export async function getRandomCat() {
  try {
    const res = await axios.get(CAT_API_ENDPOINT, {
      headers: {
        "x-api-key": env.CAT_API_KEY,
      },
    });
    return CatResponseSchema.parseAsync(res.data);
  } catch (error: unknown) {
    extractErrorDetails(error, LOCALE.cat.failedFetch);
  }
}
